// sanity/lib/serverClient.ts
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/lib/api'

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // <-- required for writes
})