import { Complaint, Category } from '../../lib/supabase';
import * as Icons from 'lucide-react';
import { X, Clock, CheckCircle, AlertCircle, XCircle, Calendar, Tag } from 'lucide-react';

interface ComplaintDetailModalProps {
  complaint: Complaint;
  category: Category | undefined;
  onClose: () => void;
  onUpdate: () => void;
}

export function ComplaintDetailModal({
  complaint,
  category,
  onClose,
}: ComplaintDetailModalProps) {
  const Icon = (Icons as any)[category?.icon || 'MessageSquare'] || Icons.MessageSquare;

  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending', description: 'Your complaint has been received and is waiting for review' },
    in_progress: { color: 'bg-blue-100 text-blue-800', icon: AlertCircle, label: 'In Progress', description: 'Our team is actively working on resolving your complaint' },
    resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Resolved', description: 'Your complaint has been successfully resolved' },
    rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected', description: 'Your complaint could not be processed as submitted' },
  };

  const priorityConfig = {
    low: { color: 'bg-gray-100 text-gray-700', label: 'Low Priority', icon: '⚪' },
    medium: { color: 'bg-orange-100 text-orange-700', label: 'Medium Priority', icon: '🟠' },
    high: { color: 'bg-red-100 text-red-700', label: 'High Priority', icon: '🔴' },
  };

  const statusInfo = statusConfig[complaint.status];
  const priorityInfo = priorityConfig[complaint.priority];
  const StatusIcon = statusInfo.icon;

  const createdDate = new Date(complaint.created_at);
  const updatedDate = new Date(complaint.updated_at);
  const resolvedDate = complaint.resolved_at ? new Date(complaint.resolved_at) : null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 p-6 flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="bg-white rounded-lg p-3">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-900 truncate">{complaint.title}</h2>
              <p className="text-gray-600 mt-1">{category?.name || 'Uncategorized'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-lg p-4 ${statusInfo.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <StatusIcon className="w-5 h-5" />
                <span className="font-semibold">{statusInfo.label}</span>
              </div>
              <p className="text-sm opacity-90">{statusInfo.description}</p>
            </div>

            <div className={`rounded-lg p-4 ${priorityInfo.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{priorityInfo.icon}</span>
                <span className="font-semibold">{priorityInfo.label}</span>
              </div>
              <p className="text-sm opacity-90">Priority level for resolution</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{complaint.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Created</span>
              </div>
              <p className="text-gray-900 font-semibold">{formatDate(createdDate)}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Last Updated</span>
              </div>
              <p className="text-gray-900 font-semibold">{formatDate(updatedDate)}</p>
            </div>

            {resolvedDate && (
              <div className="bg-green-50 rounded-lg p-4 col-span-2">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Resolved Date</span>
                </div>
                <p className="text-green-900 font-semibold">{formatDate(resolvedDate)}</p>
              </div>
            )}
          </div>

          {complaint.admin_response && (
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">Admin Response</h3>
                </div>
                <p className="text-blue-800 leading-relaxed">{complaint.admin_response}</p>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Complaint Timeline</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                    <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Complaint Submitted</p>
                    <p className="text-sm text-gray-600">{formatDate(createdDate)}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${complaint.status !== 'pending' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Under Review</p>
                    <p className="text-sm text-gray-600">
                      {complaint.status !== 'pending' ? 'Started' : 'Pending'} on {formatDate(updatedDate)}
                    </p>
                  </div>
                </div>

                {complaint.status === 'resolved' && resolvedDate && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Resolved</p>
                      <p className="text-sm text-gray-600">{formatDate(resolvedDate)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
