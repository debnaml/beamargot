// app/api/newsletter/route.ts
import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'chn5i0ta',
  dataset: 'production',
  token: process.env.SANITY_API_WRITE_TOKEN, // 🔐
  apiVersion: '2023-07-01',
  useCdn: false,
})

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    await client.create({
      _type: 'newsletterSignup',
      email,
      subscribedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}