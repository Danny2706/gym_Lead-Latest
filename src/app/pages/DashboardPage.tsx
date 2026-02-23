import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  Users,
  UserCheck,
  UserPlus,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { LeadTable } from "../components/dashboard/LeadTable";
import { LeadDetailModal } from "../components/dashboard/LeadDetailModel";
import { DashboardChart } from "../features/DashboardChart";
import {
  getContacts,
  removeContact,
  changeStatus,
  Lead,
} from "../features/contactSlice";
import { Button } from "../components/ui/button";
import { CSVLink } from "react-csv";

export function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { leads = [], loading } = useSelector(
    (state: RootState) => state.contact,
  );

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  // CSV export
  const csvData = leads.map((l) => ({
    "First Name": l.first_name,
    "Last Name": l.last_name,
    Email: l.email,
    Phone: l.phone,
    Status: l.status,
    "Created At": new Date(l.created_at).toLocaleString(),
    Message: l.message,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <h1 className="text-xl font-semibold mt-2">
              Lead Management Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <CSVLink
              data={csvData}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Export CSV
            </CSVLink>
            <div className="text-2xl">
              <span className="text-red-600">Fit</span>Life
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Leads"
            value={stats.totalLeads}
            icon={Users}
          />
          <StatsCard title="New" value={stats.newLeads} icon={UserPlus} />
          <StatsCard
            title="Contacted"
            value={stats.contacted}
            icon={UserCheck}
          />
          <StatsCard
            title="Converted"
            value={stats.converted}
            icon={TrendingUp}
          />
        </div>

        {/* Analytics Chart */}
        <DashboardChart leads={leads} />

        {/* Lead Table */}
        {loading ? (
          <p className="text-center">Loading leads...</p>
        ) : (
          <LeadTable
            leads={leads.map((l) => ({
              id: l.id,
              firstName: l.first_name,
              lastName: l.last_name,
              email: l.email,
              phone: l.phone,
              message: l.message,
              status: l.status,
              createdAt: l.created_at,
            }))}
            onViewLead={(lead) => {
              setSelectedLead(lead as any);
              setIsModalOpen(true);
            }}
            onDeleteLead={(id) => dispatch(removeContact(id))}
            onStatusChange={(id, status) =>
              dispatch(changeStatus({ id, status }))
            }
          />
        )}
      </main>

      <LeadDetailModal
        lead={selectedLead}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
