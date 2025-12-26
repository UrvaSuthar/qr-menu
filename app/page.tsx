import { QrCode, CheckCircle, Zap, CreditCard, Smartphone } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <QrCode size={24} className="text-black" strokeWidth={2} />
              <span className="text-xl font-semibold text-black">QR Menu</span>
            </div>
            <div className="flex gap-4">
              <a href="/login" className="text-gray-600 hover:text-black font-medium transition">
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-lg font-semibold transition"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full border-2 border-red-600">
            <QrCode size={40} className="text-red-600" strokeWidth={1.5} />
          </div>

          <h1 className="text-5xl sm:text-6xl font-semibold text-black mb-6 leading-tight tracking-tight">
            Turn Your Menu Into a QR Code
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload your PDF. Get a QR code. Place it on tables.<br />
            Your menu is now digital, updatable, and always accessible.
          </p>
          <a
            href="/signup"
            className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-sm hover:shadow-md transform hover:scale-105 transition-all"
          >
            Create Your QR Menu →
          </a>
          <p className="mt-4 text-sm text-gray-500">
            Free forever · No credit card required · Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-black mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get your QR menu live in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-lg flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">Upload Your Menu</h3>
              <p className="text-gray-600">
                Upload your menu as a PDF file. Any format works.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-lg flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">Get Your QR Code</h3>
              <p className="text-gray-600">
                Download your unique QR code. Print it anywhere.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-lg flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">Place on Tables</h3>
              <p className="text-gray-600">
                Customers scan and view your menu instantly. No app needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-black mb-4">
              Why Restaurants Love Us
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to digitize your menu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-white border border-gray-200 rounded-lg hover:border-black transition-all">
              <Smartphone size={40} className="text-red-600 mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-black mb-3">Instant Menu Access</h3>
              <p className="text-gray-600">
                Customers scan QR, menu opens. No app download. Works on any phone.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-white border border-gray-200 rounded-lg hover:border-black transition-all">
              <Zap size={40} className="text-red-600 mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-black mb-3">Easy Updates</h3>
              <p className="text-gray-600">
                Upload new PDF anytime. QR code stays the same. Menu updates automatically.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-white border border-gray-200 rounded-lg hover:border-black transition-all">
              <QrCode size={40} className="text-red-600 mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-black mb-3">Food Court Support</h3>
              <p className="text-gray-600">
                Multiple vendors, one QR. Customers pick restaurant. Unified professional look.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <CheckCircle size={32} className="text-red-600 mx-auto mb-2" strokeWidth={1.5} />
              <div className="font-semibold text-black">Free Forever</div>
              <div className="text-sm text-gray-600">Basic plan always free</div>
            </div>
            <div>
              <Zap size={32} className="text-red-600 mx-auto mb-2" strokeWidth={1.5} />
              <div className="font-semibold text-black">Setup in 5 Min</div>
              <div className="text-sm text-gray-600">Get started instantly</div>
            </div>
            <div>
              <CreditCard size={32} className="text-red-600 mx-auto mb-2" strokeWidth={1.5} />
              <div className="font-semibold text-black">No Credit Card</div>
              <div className="text-sm text-gray-600">Required to start</div>
            </div>
            <div>
              <Smartphone size={32} className="text-red-600 mx-auto mb-2" strokeWidth={1.5} />
              <div className="font-semibold text-black">Any Device</div>
              <div className="text-sm text-gray-600">Works everywhere</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-black mb-4">
            Ready to Go Digital?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create your QR menu in 5 minutes. No technical skills required.
          </p>
          <a
            href="/signup"
            className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-sm hover:shadow-md transform hover:scale-105 transition-all"
          >
            Get Started Free →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>© 2025 QR Menu Platform. Digital menus made simple.</p>
        </div>
      </footer>
    </div>
  );
}
