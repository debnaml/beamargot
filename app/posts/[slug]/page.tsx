// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { getPostBySlug, getRelatedPosts } from '@/lib/sanityClient'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
} from 'react-icons/fa'

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()

    const relatedPosts =
  post.categories?.length > 0
    ? await getRelatedPosts(post.categories[0]._id, post._id)
    : []

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Hero Image */}
      {post.image && (
        <div className="mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-lg"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bosch mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-gray-600 italic mb-4">
              {post.excerpt}
            </p>
          )}

          <div className="text-sm text-gray-500 mb-10">
            {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
          </div>

          <div className="prose prose-lg max-w-none [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif">
            <PortableText value={post.body} />
          </div>
           {relatedPosts.length > 0 && (
            <div className="mt-20 border-t pt-10">
                <h3 className="text-3xl font-bosch mb-6">Related Reads</h3>
                <div className="grid gap-6 md:grid-cols-2">
                {relatedPosts.map((related) => (
                    
                    <Link key={related._id} href={`/posts/${related.slug?.current || ''}`} className="group block">
                    {related.mainImage ? (
                        <img
                        src={related.mainImage}
                        alt={related.title}
                        className="w-full rounded-md aspect-video object-cover mb-2"
                        />
                    ) : (
                        <div className="aspect-video bg-gray-100 rounded-md mb-2" />
                    )}
                    <h4 className="text-lg font-bold group-hover:underline">
                        {related.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{related.excerpt}</p>
                    </Link>
                ))}
                </div>
            </div>
        )}
        </div>
       
        {/* Sidebar */}
        <aside className="space-y-10">
          {/* Author Info */}
          {post.author && (
           <div>
           <div className="flex gap-4 items-center mb-3">
             {post.author.avatar && (
               <img
                 src={post.author.avatar}
                 alt={post.author.name}
                 className="w-14 h-14 rounded-full object-cover"
               />
             )}
             <div>
               <div className="text-xs uppercase text-gray-900 font-bold tracking-wide">
                 By {post.author.name}
               </div>
               {post.author.column && (
                 <div className="text-xs text-gray-600">{post.author.column}</div>
               )}
             </div>
           </div>
     
           {/* Full-width bio */}
           {post.author.bio && (
             <p className="text-sm text-gray-700 leading-relaxed">
               {post.author.bio}
             </p>
           )}
     
           {/* CTA Link */}
           <Link
             href={`/authors/${post.author.slug?.current}`}
             className="inline-block mt-4 text-sm font-medium text-[#1a1a1a] hover:underline"
           >
             Read more by {post.author.name}
           </Link>
         </div>
          )}

          {/* Social Share */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Share this post
            </p>
            <div className="flex gap-4 text-gray-600">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}&url=${encodeURIComponent(`https://yourdomain.com/posts/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  `https://yourdomain.com/posts/${post.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  `https://yourdomain.com/posts/${post.slug}`
                )}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}