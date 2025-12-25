export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="text-7xl mb-6">📱🍽️</div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            QR Menu Platform
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12">
            Create stunning digital menus accessible via QR codes.<br />
            Perfect for restaurants and food courts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="/signup"
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Get Started Free
            </a>
            <a
              href="/login"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition"
            >
              Log In
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Instant Updates</h3>
              <p className="text-white/80 text-sm">
                Update your menu in real-time. No need to reprint QR codes.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-lg font-semibold mb-2">Beautiful Design</h3>
              <p className="text-white/80 text-sm">
                Professional menus that wow your customers.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-white/80 text-sm">
                Track QR scans and understand customer behavior.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-white/70 text-sm">
            <p>Free forever. No credit card required.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
