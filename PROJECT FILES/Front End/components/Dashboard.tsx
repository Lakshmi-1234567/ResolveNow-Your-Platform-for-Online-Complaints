import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Complaint, Category } from '../../lib/supabase';
import { Plus, LogOut, Shield, User } from 'lucide-react';
import { ComplaintsList } from './ComplaintsList';
import { NewComplaintForm } from './NewComplaintForm';
import { AdminPanel } from '../Admin/AdminPanel';

export function Dashboard() {
  const { profile, signOut } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    await Promise.all([loadComplaints(), loadCategories()]);
    setLoading(false);
  }

  async function loadComplaints() {
    const { data } = await supabase
      .from('complaints')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setComplaints(data);
    }
  }

  async function loadCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (data) {
      setCategories(data);
    }
  }

  async function handleComplaintCreated() {
    setShowNewForm(false);
    await loadComplaints();
  }

  const isAdmin = profile?.role === 'admin';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">ResolveNow</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{profile?.full_name}</span>
                {isAdmin && (
                  <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    Admin
                  </span>
                )}
              </div>

              {isAdmin && (
                <button
                  onClick={() => setShowAdmin(!showAdmin)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  {showAdmin ? 'My Complaints' : 'Admin Panel'}
                </button>
              )}

              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showAdmin && isAdmin ? (
          <AdminPanel complaints={complaints} categories={categories} onUpdate={loadComplaints} />
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">My Complaints</h2>
                <p className="text-gray-600 mt-1">Track and manage all your submitted complaints</p>
              </div>

              <button
                onClick={() => setShowNewForm(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl font-medium"
              >
                <Plus className="w-5 h-5" />
                New Complaint
              </button>
            </div>

            {showNewForm && (
              <NewComplaintForm
                categories={categories}
                onClose={() => setShowNewForm(false)}
                onSuccess={handleComplaintCreated}
              />
            )}

            <ComplaintsList complaints={complaints} categories={categories} onUpdate={loadComplaints} />
          </>
        )}
      </main>
    </div>
  );
}
