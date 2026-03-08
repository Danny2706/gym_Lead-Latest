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
  interest?: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "converted";
  createdAt: string;
}

interface LeadTableProps {
  leads: Lead[];
  onViewLead: (lead: Lead) => void;
  onDeleteLead: (id: string) => void;
  onStatusChange: (id: string, status: Lead["status"]) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  dark?: boolean;
}

export function LeadTable({
  leads = [],
  onViewLead,
  onDeleteLead,
  onStatusChange,
  currentPage,
  totalPages,
  onPageChange,
  dark = false,
}: LeadTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLeads = leads.filter((lead) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      lead.firstName.toLowerCase().includes(search) ||
      lead.lastName.toLowerCase().includes(search) ||
      lead.email.toLowerCase().includes(search);
    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Lead["status"]) => {
    if (dark) {
      switch (status) {
        case "new":
          return "bg-blue-800 text-blue-100";
        case "contacted":
          return "bg-yellow-800 text-yellow-100";
        case "qualified":
          return "bg-purple-800 text-purple-100";
        case "converted":
          return "bg-green-800 text-green-100";
        default:
          return "bg-gray-800 text-gray-200";
      }
    } else {
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
    }
  };

  return (
    <div
      className={`rounded-xl shadow-lg transition-colors duration-300 ${
        dark ? "bg-gray-900/90 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* FILTERS */}
      <div
        className={`p-4 sm:p-6 border-b flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between ${
          dark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <Input
          placeholder="Search leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full sm:max-w-sm ${
            dark
              ? "bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400 focus:border-blue-500"
              : ""
          }`}
        />

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger
            className={`w-full sm:w-[180px] ${
              dark
                ? "bg-gray-800 text-gray-100 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Dynamic color badge inside select trigger */}
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(
                statusFilter as Lead["status"],
              )}`}
            >
              {statusFilter === "all" ? "All" : statusFilter}
            </span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className={dark ? "bg-gray-800 text-gray-100" : ""}>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table
          className={`w-full text-sm transition-colors duration-300 ${
            dark ? "bg-gray-900" : "bg-white"
          }`}
        >
          <thead className={dark ? "bg-gray-800" : "bg-gray-50"}>
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className={`border-t transition-colors duration-200 hover:${
                  dark ? "bg-gray-800/70" : "bg-gray-50"
                }`}
              >
                <td className="p-4 font-medium">
                  {lead.firstName} {lead.lastName}
                </td>
                <td
                  className={`p-4 ${dark ? "text-gray-400" : "text-gray-700"}`}
                >
                  <div>{lead.email}</div>
                  <div>{lead.phone}</div>
                </td>
                <td className="p-4">
                  {/* Editable status select for each row */}
                  <Select
                    value={lead.status}
                    onValueChange={(val) =>
                      onStatusChange(lead.id, val as Lead["status"])
                    }
                  >
                    <SelectTrigger
                      className={`w-[120px] text-sm rounded-full ${getStatusColor(
                        lead.status,
                      )}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      className={dark ? "bg-gray-800 text-gray-100" : ""}
                    >
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td
                  className={`p-4 ${dark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onViewLead(lead)}
                    className={dark ? "text-gray-100" : ""}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteLead(lead.id)}
                    className={dark ? "text-red-400 hover:text-red-500" : ""}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden p-4 space-y-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className={`border rounded-lg p-4 space-y-2 shadow-sm transition-colors duration-300 ${
              dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">
                {lead.firstName} {lead.lastName}
              </h4>
              <Badge className={getStatusColor(lead.status)}>
                {lead.status}
              </Badge>
            </div>

            <div
              className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}
            >
              <p>{lead.email}</p>
              <p>{lead.phone}</p>
              <p>{new Date(lead.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                className={`flex-1 ${
                  dark ? "border-gray-700 text-gray-100 hover:bg-gray-800" : ""
                }`}
                onClick={() => onViewLead(lead)}
              >
                View
              </Button>
              <Button
                size="sm"
                className={`flex-1 ${
                  dark
                    ? "bg-blue-700 hover:bg-blue-600 text-white"
                    : "bg-blue-900 hover:bg-blue-800 text-white"
                }`}
                onClick={() => onDeleteLead(lead.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div
        className={`flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t transition-colors duration-300 ${
          dark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-full sm:w-auto"
        >
          Previous
        </Button>

        <span className={`${dark ? "text-gray-400" : "text-gray-600"} text-sm`}>
          Page {currentPage} of {totalPages}
        </span>

        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-full sm:w-auto"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
