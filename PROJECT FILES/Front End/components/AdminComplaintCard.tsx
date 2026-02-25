import { useState } from 'react';
import { Complaint, supabase } from '../../lib/supabase';
import * as Icons from 'lucide-react';
import { Clock, CheckCircle, XCircle, AlertCircle, Save } from 'lucide-react';

interface AdminComplaintCardProps {
  complaint: Complaint;
  categoryName: string;
  categoryIcon: string;
  onUpdate: () => void;
}

export function AdminComplaintCard({ complaint, categoryName, categoryIcon, onUpdate }: AdminComplaintCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(complaint.status);
  const [response, setResponse] = useState(complaint.admin_response || '');
  const [loading, setLoading] = useState(false);

  const Icon = (Icons as any)[categoryIcon] || Icons.MessageSquare;

  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
    in_progress: { color: 'bg-blue-100 text-blue-800', icon: AlertCircle, label: 'In Progress' },
    resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Resolved' },
    rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' },
  };

  const priorityConfig = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusInfo = statusConfig[complaint.status];
  const StatusIcon = statusInfo.icon;

  async function handleUpdate() {
    setLoading(true);

    const updateData: any = {
      status,
      admin_response: response,
      updated_at: new Date().toISOString(),
    };

    if (status === 'resolved' && complaint.status !== 'resolved') {
      updateData.resolved_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('complaints')
      .update(updateData)
      .eq('id', complaint.id);

    setLoading(false);

    if (!error) {
      onUpdate();
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200">
      <div
        className="p-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{complaint.title}</h3>
              <p className="text-sm text-gray-500">{categoryName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityConfig[complaint.priority]}`}>
              {complaint.priority.toUpperCase()}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
              <StatusIcon className="w-3 h-3" />
              {statusInfo.label}
            </span>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Description:</p>
              <p className="text-gray-600">{complaint.description}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Response
              </label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Provide a response to the user..."
              />
            </div>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Updating...' : 'Update Complaint'}
            </button>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
              <span>Created: {new Date(complaint.created_at).toLocaleDateString()}</span>
              {complaint.resolved_at && (
                <span>Resolved: {new Date(complaint.resolved_at).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
