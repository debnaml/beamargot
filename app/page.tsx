import Link from 'next/link'
import { getRecentPosts } from '@/lib/sanityClient'
import { format } from 'date-fns'

export default async function HomePage() {
  const posts = await getRecentPosts()

  const [featured, ...rest] = posts
  const leftPosts = rest.slice(0, 2)
  const rightPosts = rest.slice(2)

  const AuthorInfo = ({ author }) => {
    const initials = author?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

    const avatar = author?.avatar ? (
      <img
        src={author.avatar}
        alt={author.name}
        className="w-5 h-5 rounded-full object-cover"
      />
    ) : (
      <div className="w-5 h-5 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-[10px] font-medium">
        {initials}
      </div>
    )

    return (
      <Link href={`/authors/${author.slug}`} className="flex items-center gap-2 mt-1 hover:underline">
        {avatar}
        <span className="text-sm text-gray-600">{author?.name || '—'}</span>
      </Link>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      {/* Hero Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bosch">Bea & Margot</h1>
        <p className="mt-4 text-lg text-gray-600">
          A curated journal of modern thought — essays, letters, and creative perspectives.
        </p>
      </section>

      {/* 3-Column Responsive Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column */}
        <div className="md:col-span-3 md:order-1 border-t md:border-t-0 md:border-r border-gray-200 pr-0 md:pr-4 space-y-6">
          {leftPosts.map((post) => (
            <div key={post._id}>
              <Link href={`/posts/${post.slug}`} className="block group">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-[4/3] w-full object-cover rounded mb-2"
                  />
                ) : (
                  <div className="aspect-[4/3] bg-gray-100 rounded mb-2" />
                )}
                <h3 className="text-lg font-serif font-bold group-hover:underline mb-1">
                  {post.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-600">
                {format(new Date(post.publishedAt), 'MMM d, yyyy')}
              </p>
              <AuthorInfo author={post.author} />
            </div>
          ))}
        </div>

        {/* Center Column */}
        <div className="md:col-span-6 md:order-2 order-1">
          <Link href={`/posts/${featured.slug}`} className="block group">
            {featured.image ? (
              <img
                src={featured.image}
                alt={featured.title}
                className="aspect-[16/9] w-full object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="aspect-[16/9] bg-gray-200 rounded-lg mb-4" />
            )}
            <h2 className="text-3xl font-serif font-bold group-hover:underline mb-2">
              {featured.title}
            </h2>
          </Link>
          <p className="text-sm text-gray-600">
            {format(new Date(featured.publishedAt), 'MMM d, yyyy')}
          </p>
          <div className="mt-3 mb-3">
            <AuthorInfo author={featured.author} />
          </div>
          <p className="text-gray-700 text-sm">{featured.excerpt}</p>
        </div>

        {/* Right Column */}
        <div className="md:col-span-3 md:order-3 border-t md:border-t-0 md:border-l border-gray-200 pl-0 md:pl-4 space-y-6">
          {rightPosts.map((post) => (
            <div key={post._id}>
              <Link href={`/posts/${post.slug}`} className="block group">
                <h4 className="text-lg font-serif font-bold group-hover:underline mb-1">
                  {post.title}
                </h4>
              </Link>
              <p className="text-sm text-gray-600">
                {format(new Date(post.publishedAt), 'MMM d, yyyy')}
              </p>
              <AuthorInfo author={post.author} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}