'use client'

import { useState, useEffect } from 'react'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

type Author = {
  name: string
  slug: { current: string }
  column?: string
  avatarUrl?: string
}

export default function ContactPage() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    client
      .fetch(
        groq`*[_type == "author"]{
          name,
          column,
          slug,
          "avatarUrl": avatar.asset->url
        }`
      )
      .then(setAuthors)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })

    if (res.ok) {
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-12">
      {/* Contact Form */}
      <div>
        <h1 className="text-4xl font-bosch mb-6">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            {status === 'loading' ? 'Sending...' : 'Send'}
          </button>
          {status === 'success' && (
            <p className="text-green-600 mt-2">Thanks! We’ll be in touch.</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 mt-2">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>

      {/* Contributors */}
      <div>
        <h2 className="text-3xl font-bosch mb-6">Contributors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {authors.map(author => (
            <a
              key={author.slug.current}
              href={`/authors/${author.slug.current}`}
              className="flex flex-col items-center text-center hover:shadow-md p-4 rounded transition"
            >
              {author.avatarUrl ? (
                <img
                  src={author.avatarUrl}
                  alt={author.name}
                  className="w-20 h-20 rounded-full object-cover mb-3"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 mb-3" />
              )}
              <h3 className="font-semibold text-lg">{author.name}</h3>
              {author.column && (
                <p className="text-sm text-gray-500 italic">{author.column}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}