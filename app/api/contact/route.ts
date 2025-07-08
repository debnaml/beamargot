// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { serverClient } from '@/sanity/lib/serverClient'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const newMessage = {
      _type: 'contactMessage',
      name,
      email,
      message,
    }

    await serverClient.create(newMessage)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error saving contact message:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}