import { Complaint, Category } from '../../lib/supabase';
import * as Icons from 'lucide-react';
import { Clock, CheckCircle, AlertCircle, XCircle, ChevronRight } from 'lucide-react';

interface ComplaintCardProps {
  complaint: Complaint;
  category: Category | undefined;
  onViewDetails: (complaint: Complaint) => void;
}

export function ComplaintCard({ complaint, category, onViewDetails }: ComplaintCardProps) {
  const Icon = (Icons as any)[category?.icon || 'MessageSquare'] || Icons.MessageSquare;

  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending', bgLight: 'bg-yellow-50', borderColor: 'border-l-yellow-500' },
    in_progress: { color: 'bg-blue-100 text-blue-800', icon: AlertCircle, label: 'In Progress', bgLight: 'bg-blue-50', borderColor: 'border-l-blue-500' },
    resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Resolved', bgLight: 'bg-green-50', borderColor: 'border-l-green-500' },
    rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected', bgLight: 'bg-red-50', borderColor: 'border-l-red-500' },
  };

  const priorityConfig = {
    low: { color: 'bg-gray-100 text-gray-700', label: 'Low' },
    medium: { color: 'bg-orange-100 text-orange-700', label: 'Medium' },
    high: { color: 'bg-red-100 text-red-700', label: 'High' },
  };

  const statusInfo = statusConfig[complaint.status];
  const StatusIcon = statusInfo.icon;
  const priorityInfo = priorityConfig[complaint.priority];

  const createdDate = new Date(complaint.created_at);
  const daysAgo = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  const timeText = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`;

  return (
    <div
      onClick={() => onViewDetails(complaint)}
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 ${statusInfo.borderColor} ${statusInfo.bgLight} hover:scale-[1.02] cursor-pointer overflow-hidden group`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="bg-white rounded-lg p-2 group-hover:scale-110 transition-transform flex-shrink-0">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 truncate">{complaint.title}</h3>
              <p className="text-xs text-gray-600 mt-0.5">{category?.name || 'Uncategorized'}</p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{complaint.description}</p>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusInfo.color}`}>
              <StatusIcon className="w-3 h-3" />
              {statusInfo.label}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityInfo.color}`}>
              {priorityInfo.label}
            </span>
          </div>

          <div className="text-xs text-gray-500">
            {timeText}
          </div>
        </div>

        {complaint.admin_response && (
          <div className="mt-3 pt-3 border-t border-current border-opacity-20">
            <p className="text-xs font-medium text-gray-700 mb-1">Latest Update:</p>
            <p className="text-xs text-gray-600 line-clamp-2">{complaint.admin_response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
