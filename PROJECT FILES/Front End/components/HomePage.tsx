import { Shield, MessageSquare, CheckCircle, Clock } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

export function HomePage({ onGetStarted }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 pt-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600 font-medium">Your Voice Matters</span>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to <span className="text-blue-600">ResolveNow</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your platform for submitting and tracking complaints. Get your issues resolved quickly and efficiently with our streamlined complaint management system.
          </p>

          <button
            onClick={onGetStarted}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Submit Complaints</h3>
            <p className="text-gray-600 leading-relaxed">
              Easily submit your complaints with detailed descriptions and categorization for better handling.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Track Progress</h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor the status of your complaints in real-time and receive updates on resolution progress.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Get Resolved</h3>
            <p className="text-gray-600 leading-relaxed">
              Our dedicated team works to resolve your issues promptly with transparent communication.
            </p>
          </div>
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to get your issues resolved?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied users who trust ResolveNow for their complaint management needs.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 text-lg font-semibold shadow-lg"
          >
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
}
