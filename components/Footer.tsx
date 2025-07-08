
'use client'
// components/Footer.tsx
import Link from 'next/link'
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Newsletter CTA */}
        <div className="bg-gray-50 rounded-lg p-6 text-center md:text-left">
          <h2 className="text-3xl md:text-3xl font-bosch text-gray-900 mb-2">
            Be part of the Club
          </h2>
          <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto md:mx-0">
            Thoughtful essays, creative perspectives, and cultural insights, straight to your inbox every week.
          </p>
          <form
          onSubmit={async (e) => {
            e.preventDefault()
            const form = e.currentTarget
            const email = form.email.value

            const res = await fetch('/api/newsletter', {
              method: 'POST',
              body: JSON.stringify({ email }),
              headers: { 'Content-Type': 'application/json' },
            })

            if (res.ok) {
              form.reset()
              alert('Thanks for subscribing!')
            } else {
              alert('Oops — something went wrong.')
            }
          }}
          className="flex flex-col sm:flex-row sm:items-center gap-3 max-w-md mx-auto md:mx-0"
        >
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
          >
            Subscribe
          </button>
        </form>
        </div>

        {/* Main Footer */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Branding + Social */}
          <div className="space-y-4">
            
           
            <h3 className="font-bosch text-2xl">Bea & Margot</h3>
            
            <div className="flex items-center gap-4 text-gray-500">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="w-5 h-5 hover:text-black transition" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="w-5 h-5 hover:text-black transition" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-5 h-5 hover:text-black transition" />
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Bea & Margot. All rights reserved.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-8 text-sm text-gray-600">
            <div className="space-y-2">
              <h3 className="text-gray-900 font-semibold">Explore</h3>
              <ul className="space-y-1">
                <li><Link href="/about" className="hover:underline">About</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                <li><Link href="/topics" className="hover:underline">Topics</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-gray-900 font-semibold">Legal</h3>
              <ul className="space-y-1">
                <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
                <li><Link href="/terms" className="hover:underline">Terms</Link></li>
                <li><Link href="/cookies" className="hover:underline">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}