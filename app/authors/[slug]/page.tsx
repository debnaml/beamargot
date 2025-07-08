// app/authors/[slug]/page.tsx
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import PostCard from '@/components/PostCard'

type Props = {
  params: {
    slug: string
  }
}

const query = groq`
  *[_type == "author" && slug.current == $slug][0]{
    name,
    column,
    bio,
    "avatarUrl": avatar.asset->url,
    "posts": *[_type == "post" && author._ref == ^._id] | order(publishedAt desc){
      _id,
      title,
      slug,
      excerpt,
      "image": mainImage.asset->url,
      publishedAt
    }
  }
`

export default async function AuthorPage({ params }: Props) {
  const data = await client.fetch(query, { slug: params.slug })

  if (!data) return <div>Author not found</div>

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex items-center gap-4 mb-6">
        {data.avatarUrl && (
          <Image
            src={data.avatarUrl}
            alt={data.name}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-3xl font-bosch">{data.name}</h1>
          {data.column && <p className="text-sm text-gray-500 italic">{data.column}</p>}
        </div>
      </div>

      {data.bio && (
        <p className="mb-8 text-gray-700 leading-relaxed">{data.bio}</p>
      )}

      <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
      <div className="space-y-6">
        {data.posts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}