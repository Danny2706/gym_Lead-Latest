import { X, Mail, Phone, Calendar, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Lead } from "./LeadTable";

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadDetailModal({
  lead,
  isOpen,
  onClose,
}: LeadDetailModalProps) {
  if (!lead) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Lead Details</span>
            <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="mb-4 text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <p className="text-gray-900">{lead.firstName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <p className="text-gray-900">{lead.lastName}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-gray-900">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="text-gray-900">{lead.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <p className="text-gray-900">{lead.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm text-gray-600">Submitted On</label>
                  <p className="text-gray-900">
                    {new Date(lead.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <h3 className="text-gray-900">Message</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">
                {lead.message}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 bg-red-600 hover:bg-red-700">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call Lead
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
