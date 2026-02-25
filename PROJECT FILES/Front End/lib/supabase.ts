import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_at: string;
};

export type Complaint = {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  admin_response: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
};
