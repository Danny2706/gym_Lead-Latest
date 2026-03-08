import { Mail, Phone, Calendar, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Lead } from "./LeadTable";

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  dark?: boolean;
}

export function LeadDetailModal({
  lead,
  isOpen,
  onClose,
  dark = false,
}: LeadDetailModalProps) {
  if (!lead) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
          dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Lead Details</span>
            <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className={`mb-4 ${dark ? "text-gray-100" : "text-gray-900"}`}>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}
                >
                  First Name
                </label>
                <p>{lead.firstName}</p>
              </div>
              <div>
                <label
                  className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Last Name
                </label>
                <p>{lead.lastName}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`mb-4 ${dark ? "text-gray-100" : "text-gray-900"}`}>
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail
                  className={`w-5 h-5 ${dark ? "text-gray-400" : "text-gray-400"}`}
                />
                <div>
                  <label
                    className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Email
                  </label>
                  <p>{lead.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone
                  className={`w-5 h-5 ${dark ? "text-gray-400" : "text-gray-400"}`}
                />
                <div>
                  <label
                    className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Phone
                  </label>
                  <p>{lead.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar
                  className={`w-5 h-5 ${dark ? "text-gray-400" : "text-gray-400"}`}
                />
                <div>
                  <label
                    className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Submitted On
                  </label>
                  <p>{new Date(lead.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare
                className={`w-5 h-5 ${dark ? "text-gray-400" : "text-gray-400"}`}
              />
              <h3>Message</h3>
            </div>
            <div
              className={`rounded-lg p-4 ${dark ? "bg-gray-800" : "bg-gray-50"}`}
            >
              <p className="whitespace-pre-wrap">{lead.message}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button className="flex-1">Send Email</Button>
            <Button variant="outline" className="flex-1">
              Call Lead
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
