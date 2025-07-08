import Link from 'next/link'
import { format } from 'date-fns'
import { getAllTopicsWithPosts } from '@/lib/sanityClient'

export default async function TopicsPage() {
  const topics = await getAllTopicsWithPosts()

  // Distribute topics evenly into 3 columns
  const columns = [[], [], []]
  topics.forEach((topic, index) => {
    columns[index % 3].push(topic)
  })

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bosch mb-8 text-center">All Topics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y-0 md:divide-x divide-gray-200 gap-8 md:gap-6">
        {columns.map((columnTopics, colIndex) => (
          <div key={colIndex} className="space-y-8 md:px-4">
            {columnTopics.map((topic) => (
              <div key={topic._id} className="space-y-4 border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-serif font-bold">{topic.title}</h2>
                  <Link
                    href={`/topics/${topic.slug}`}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <ul className="space-y-4">
                  {topic.posts.map((post) => (
                    <li key={post._id} className="border-t border-gray-100 pt-3">
                      <Link href={`/posts/${post.slug}`} className="block group">
                        <h3 className="text-md font-serif font-medium group-hover:underline">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500">
                        {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                      </p>
                      {post.author?.name && (
                        <Link
                          href={`/authors/${post.author.slug}`}
                          className="text-sm text-gray-600 hover:underline"
                        >
                          {post.author.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}