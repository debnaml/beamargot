// app/topics/[slug]/page.tsx
import { getTopicBySlug, getPostsByTopic, getAllTopics } from '@/lib/sanityClient'
import Link from 'next/link'
import { format } from 'date-fns'

export async function generateStaticParams() {
  const topics = await getAllTopics()
  return topics.map(topic => ({ slug: topic.slug.current }))
}

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const topic = await getTopicBySlug(params.slug)
  const posts = await getPostsByTopic(params.slug)

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bosch">{topic.title}</h1>
        {topic.description && (
          <p className="mt-2 text-gray-600 text-lg">{topic.description}</p>
        )}
        {topic.image && (
          <img src={topic.image} alt={topic.title} className="w-full mt-6 rounded-lg aspect-[3/1] object-cover" />
        )}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
          post.slug?.current && (
            <Link href={`/posts/${post.slug.current}`} key={post._id} className="group">
            {post.image && (
                <img src={post.image} alt={post.title} className="rounded aspect-[4/3] object-cover mb-2" />
            )}
            <h3 className="text-lg font-serif font-semibold group-hover:underline">{post.title}</h3>
            <p className="text-sm text-gray-500">
                {format(new Date(post.publishedAt), 'MMM d, yyyy')}
            </p>
            </Link>
          )
        ))}
      </div>
    </div>
  )
}