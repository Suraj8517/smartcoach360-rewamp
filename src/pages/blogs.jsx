import React, { useEffect, useState } from 'react'
import { client, urlFor } from '../sanityclient'
import { Link } from 'react-router-dom'
const url = import.meta.env.VITE_CALENDLY_LINK;
const QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, publishedAt, excerpt, mainImage,
  "author": author->name,
  "category": category->title,
  "part": partNumber,
  "level": difficultyLevel
}`

function getReadTime(excerpt = '') {
  const words = excerpt.trim().split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}

/* Only the shimmer animation isn't expressible in Tailwind utilities */
const shimmerStyle = `
  @keyframes shimmer {
    0%   { background-position: -600px 0 }
    100% { background-position:  600px 0 }
  }
  .shimmer {
    background: linear-gradient(90deg, #f3f3f3 25%, #ebebeb 50%, #f3f3f3 75%);
    background-size: 600px 100%;
    animation: shimmer 1.4s infinite linear;
  }
`

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="shimmer rounded-lg w-full aspect-video" />
      <div className="shimmer rounded w-24 h-3" />
      <div className="shimmer rounded w-[85%] h-5" />
      <div className="shimmer rounded w-[70%] h-5" />
      <div className="shimmer rounded w-full h-3.5" />
      <div className="shimmer rounded w-[80%] h-3.5" />
      <div className="shimmer rounded w-28 h-3 mt-1" />
    </div>
  )
}

function PostCard({ post }) {
  const readTime = getReadTime(post.excerpt || '')

  return (
    <Link
      to={`/blogs/${post.slug.current}`}
      className="flex flex-col group no-underline text-inherit transition-transform duration-200 hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="mb-4">
        {post.mainImage ? (
          <img
            src={urlFor(post.mainImage).width(600).height(338).url()}
            alt={post.title}
            className="w-full aspect-video object-cover object-center rounded-lg block"
          />
        ) : (
          <div className="w-full aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <rect x="6"  y="16" width="36" height="7" rx="3.5" fill="#ccc" />
              <rect x="6"  y="26" width="36" height="7" rx="3.5" fill="#ddd" />
              <rect x="12" y="6"  width="24" height="8" rx="4"   fill="#bbb" />
            </svg>
          </div>
        )}
      </div>

      {/* Category */}
      {post.category && (
        <p className="text-[13px] font-medium text-gray-500 mb-2 capitalize font-[Poppins]">
          {post.category}
        </p>
      )}

      {/* Title */}
      <h2 className="font-[Poppins] text-[1.15rem] font-semibold leading-snug tracking-tight text-gray-900 mb-2 group-hover:text-black transition-colors duration-150">
        {post.title}
      </h2>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="font-[Poppins] text-sm leading-relaxed text-gray-500 mb-3 line-clamp-3">
          {post.excerpt}
        </p>
      )}

      {/* Author + Read time */}
      <div className="flex items-center gap-1.5 mt-auto font-[Poppins] text-[13px] text-gray-400">
        {post.author && (
          <>
            <span className="text-gray-600 font-medium">{post.author}</span>
            <span className="text-gray-300">|</span>
          </>
        )}
        <span>{readTime}</span>
      </div>
    </Link>
  )
}

export default function Blog() {
  const [posts, setPosts]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(QUERY).then(data => {
      setPosts(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="bg-white min-h-screen font-[Poppins] mb-24">
      <style>{`
        ${shimmerStyle}
      `}</style>

      {/* ── Hero ── */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-36 lg:pt-[150px] pb-16 sm:pb-20 lg:pb-24 text-center">
        <span className="inline-block text-[13px] font-medium tracking-[0.1em] uppercase text-[#9747FF] mb-6">
          Blog & Guides
        </span>
        <h1 className="text-[clamp(36px,6vw,80px)] font-medium tracking-[-0.04em] leading-[1.05] text-[#0A0A0A] mb-6 sm:mb-7">
          Insights for Fitness 
          <br />
Professionals        </h1>
        <p className="text-base sm:text-lg leading-[1.7] text-[#6B7280] max-w-[540px] mx-auto mb-10 sm:mb-12">
          Guides, strategies, and stories to help you grow your coaching business and deliver better results for every client.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
         
           <button onClick={() => window.open(url, "_blank")}
    className="w-full sm:w-auto bg-[#0A0A0A] text-white border-none rounded-full px-8 py-4 text-[15px] font-semibold cursor-pointer tracking-[-0.01em] group"
    style={{
      letterSpacing: "0.01em",
      minHeight: "44px",
    }}
  >
    Book a Demo  <span className="translate-y-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg></span>
  </button>
          <Link to="/pricing" className="w-full sm:w-auto bg-transparent text-[#0A0A0A] border-[1.5px] border-[#E5E7EB] rounded-full px-8 py-4 text-[15px] font-semibold cursor-pointer tracking-[-0.01em]">
            See Pricing
          </Link>
        </div>
      </div>

      {/* ── Articles ── */}
      <section className="max-w-[1200px] mx-auto px-6 py-14 pb-24">

        {/* Section label row */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-300 whitespace-nowrap">
            All Articles
          </span>
          <div className="flex-1 h-px bg-gray-100" />
          {!loading && posts.length > 0 && (
            <span className="text-xs text-gray-300 whitespace-nowrap">
              {posts.length} article{posts.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-20 text-sm text-gray-300">
            No articles published yet. Check back soon.
          </div>
        )}

        {/* Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {posts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}