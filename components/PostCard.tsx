// components/PostCard.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function PostCard({ post }: { post: any }) {
  return (
    <div className="border-b pb-6">
      {post.image && (
        <div className="mb-4">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      )}
      <Link href={`/posts/${post.slug.current}`}>
        <h3 className="text-xl font-semibold text-black hover:underline">{post.title}</h3>
      </Link>
      {post.excerpt && <p className="text-gray-600 mt-2">{post.excerpt}</p>}
      <p className="text-sm text-gray-500 mt-1">{new Date(post.publishedAt).toLocaleDateString()}</p>
    </div>
  )
}