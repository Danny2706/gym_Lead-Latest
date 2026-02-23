import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "converted";
  createdAt: string;
}

interface LeadTableProps {
  leads: Lead[];
  onViewLead: (lead: Lead) => void;
  onDeleteLead: (id: string) => void;
  onStatusChange: (id: string, status: Lead["status"]) => void;
}

export function LeadTable({
  leads = [],
  onViewLead,
  onDeleteLead,
  onStatusChange,
}: LeadTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLeads = leads.filter((lead) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (lead.firstName ?? "").toLowerCase().includes(search) ||
      (lead.lastName ?? "").toLowerCase().includes(search) ||
      (lead.email ?? "").toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-yellow-100 text-yellow-800";
      case "qualified":
        return "bg-purple-100 text-purple-800";
      case "converted":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Search */}
      <div className="p-6 border-b border-gray-200">
        <Input
          placeholder="Search leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left font-medium">Name</th>
              <th className="p-4 text-left font-medium">Contact</th>
              <th className="p-4 text-left font-medium">Status</th>
              <th className="p-4 text-left font-medium">Date</th>
              <th className="p-4 text-left font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-t hover:bg-gray-50">
                {/* Name */}
                <td className="p-4 font-medium">
                  {lead.firstName} {lead.lastName}
                </td>

                {/* Contact */}
                <td className="p-4">
                  <div>{lead.email}</div>
                  <div className="text-gray-500">{lead.phone}</div>
                </td>

                {/* Status Select */}
                <td className="p-4">
                  <Select
                    value={lead.status}
                    onValueChange={(value) =>
                      onStatusChange(lead.id, value as Lead["status"])
                    }
                  >
                    <SelectTrigger
                      className={`w-[140px] h-8 text-xs ${getStatusColor(
                        lead.status,
                      )}`}
                    >
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="new">new</SelectItem>
                      <SelectItem value="contacted">contacted</SelectItem>
                      <SelectItem value="qualified">qualified</SelectItem>
                      <SelectItem value="converted">converted</SelectItem>
                    </SelectContent>
                  </Select>
                </td>

                {/* Date */}
                <td className="p-4 text-gray-500">
                  {lead.createdAt
                    ? new Date(lead.createdAt).toLocaleDateString()
                    : ""}
                </td>

                {/* Actions */}
                <td className="p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteLead(lead.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <div className="text-center p-8 text-gray-500">No leads found</div>
        )}
      </div>
    </div>
  );
}
