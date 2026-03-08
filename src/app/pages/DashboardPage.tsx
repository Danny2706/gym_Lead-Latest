"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  UserCheck,
  UserPlus,
  TrendingUp,
  ArrowLeft,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { LeadTable } from "../components/dashboard/LeadTable";
import { LeadDetailModal } from "../components/dashboard/LeadDetailModel";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../components/hooks";
import { logout } from "../features/authSlice";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import { LeadsChart } from "../components/dashboard/LeadsChart";
import { ConversionChart } from "../components/dashboard/ConversionChart";
import {
  getContacts,
  removeContact,
  changeStatus,
} from "../features/contactSlice";
import { CSVLink } from "react-csv";

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const { leads, loading, total, totalPages, page } = useAppSelector(
    (state) => state.contact,
  );

  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(getContacts({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch(getContacts({ page: newPage, limit: 10 }));
  };

  const handleDeleteLead = async (id: string) => {
    try {
      await dispatch(removeContact(id)).unwrap();
      toast.success("Lead deleted successfully");
      dispatch(getContacts({ page, limit: 10 }));
    } catch {
      toast.error("Failed to delete lead");
    }
  };

  const handleStatusChange = async (id: string, status: any) => {
    try {
      await dispatch(changeStatus({ id, status })).unwrap();
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const stats = {
    totalLeads: total,
    newLeads: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden bg-white dark:bg-gray-900 shadow-md px-4 py-4 flex justify-between items-center transition-colors duration-500">
        <h1 className="font-semibold text-lg">Dashboard</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-900 dark:text-gray-100"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-xl z-50 p-6 flex flex-col gap-4 transition-colors duration-500"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-900 dark:text-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <CSVLink
            data={csvData}
            filename="contacts.csv"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-center transition-colors duration-300"
          >
            Export CSV
          </CSVLink>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </motion.div>
      )}

      {/* ================= DESKTOP HEADER ================= */}
      <header className="hidden md:block bg-white dark:bg-gray-900 shadow-md transition-colors duration-500">
        <div className="container mx-auto px-4 py-6 flex justify-between">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="mb-2 text-gray-900 dark:text-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-semibold">
              Lead Management Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome, {user?.email}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <CSVLink
              data={csvData}
              filename="contacts.csv"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-300"
            >
              Export CSV
            </CSVLink>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="container mx-auto px-4 py-8">
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Leads"
            value={stats.totalLeads}
            icon={Users}
            dark
          />
          <StatsCard
            title="New Leads"
            value={stats.newLeads}
            icon={UserPlus}
            dark
          />
          <StatsCard
            title="Contacted"
            value={stats.contacted}
            icon={UserCheck}
            dark
          />
          <StatsCard
            title="Converted"
            value={stats.converted}
            icon={TrendingUp}
            dark
          />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LeadsChart dark />
          <ConversionChart dark />
        </div>

        {/* LEADS TABLE */}
        {loading ? (
          <div className="text-center py-10">Loading...</div>
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
              setSelectedLead(lead);
              setIsModalOpen(true);
            }}
            onDeleteLead={handleDeleteLead}
            onStatusChange={handleStatusChange}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            dark
          />
        )}

      </main>

      {/* LEAD DETAIL MODAL */}
      <LeadDetailModal
        lead={selectedLead}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dark
      />

      <Toaster position="top-right" />
    </div>
  );
}
