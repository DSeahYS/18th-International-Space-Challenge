import Link from "next/link";
import Image from "next/image";

export default function InvestorsPage() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white min-h-screen">
      {/* Header */}
      <header className="bg-slate-800 py-4 px-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/icons/Logo.png"
              alt="Project AURA Logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-blue-400">Project AURA</span>
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/features/sovereign-ai-brain" className="hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link href="/team" className="hover:text-blue-400 transition-colors">
              Team
            </Link>
            <Link href="/investors" className="hover:text-blue-400 transition-colors">
              Investors
            </Link>
          </div>
        </nav>
      </header>

      {/* Investor Relations */}
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Investor Relations</h1>
          <p className="text-xl text-center mb-12 text-gray-300">
            Join us in revolutionizing space autonomy. We're seeking strategic partners and investors to bring Project AURA to life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-slate-800 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input type="text" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea rows={4} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                  Send Message
                </button>
              </form>
            </div>

            {/* Investment Info */}
            <div className="space-y-8">
              <div className="bg-slate-800 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Why Invest in AURA?</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• First-mover advantage in AI-driven space autonomy</li>
                  <li>• Strong partnerships with NASA and space industry leaders</li>
                  <li>• Scalable technology with applications beyond space</li>
                  <li>• Experienced founding team with proven track record</li>
                </ul>
              </div>

              <div className="bg-slate-800 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Funding Goals</h3>
                <p className="text-gray-300 mb-4">
                  We're raising $5M in seed funding to complete prototype development and secure NASA partnerships.
                </p>
                <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition-colors">
                  Download Pitch Deck
                </button>
              </div>

              <div className="bg-slate-800 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <p className="text-gray-300">
                  Email: investors@projectaura.com<br />
                  Phone: +1 (555) 123-4567<br />
                  Address: 123 Space Drive, Houston, TX 77001
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}