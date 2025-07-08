'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { getCategories } from '../lib/sanityClient'
import Logo from './Logo'

type Category = {
  _id: string
  title: string
  slug: string
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    async function fetchData() {
      const data = await getCategories()
      setCategories(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 h-20 bg-white border-b border-gray-200 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Fixed size logo (no animation, no scroll logic) */}
        <Link href="/" className="flex items-center">
          <Logo className="h-14 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-6 items-center text-sm font-sans text-gray-800 relative">
          <Link href="/about" className="hover:underline hover:text-black">About</Link>

          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-1 hover:underline hover:text-black"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Topics <ChevronDown size={16} />
            </button>

            <div
              className={`absolute left-0 top-full mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-50 transition-all duration-200 transform ${
                dropdownOpen
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/topics/${cat.slug}`}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  {cat.title}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-1">
                <Link
                  href="/topics"
                  className="block px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-b-md"
                  onClick={() => setDropdownOpen(false)}
                >
                  View all topics →
                </Link>
              </div>
            </div>
          </div>

          <Link href="/contact" className="hover:underline hover:text-black">Contact</Link>
        </nav>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 space-y-2 font-sans">
          <Link href="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            About
          </Link>
          <details className="px-4 py-2">
            <summary className="cursor-pointer text-gray-800">Topics</summary>
            <div className="ml-4 mt-2 space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/topics/${cat.slug}`}
                  className="block text-sm text-gray-700 hover:underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.title}
                </Link>
              ))}
              <Link
                href="/topics"
                className="block pt-2 text-sm font-medium text-blue-700 hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                View all topics →
              </Link>
            </div>
          </details>
          <Link href="/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}