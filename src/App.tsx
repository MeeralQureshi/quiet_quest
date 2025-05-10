function App() {
  return (
    <div className="min-h-screen bg-[#1E2A3C]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  Welcome to Quiet Quest
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Your journey to mindfulness begins here
                </p>
                <div className="space-y-4">
                  <button className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                    Get Started
                  </button>
                  <p className="text-sm text-gray-500">
                    Join thousands of others on their mindfulness journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 