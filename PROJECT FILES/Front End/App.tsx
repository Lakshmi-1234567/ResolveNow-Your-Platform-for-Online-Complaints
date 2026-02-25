import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { HomePage } from './components/HomePage';
import { Login } from './components/Auth/Login';
import { SignUp } from './components/Auth/SignUp';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading ResolveNow...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        {authMode === 'login' ? (
          <Login onToggle={() => setAuthMode('signup')} />
        ) : (
          <SignUp onToggle={() => setAuthMode('login')} />
        )}
      </div>
    );
  }

  return <HomePage onGetStarted={() => setShowAuth(true)} />;
}

export default App;
