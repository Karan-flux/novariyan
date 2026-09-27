import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';

import {
BLOG_CATEGORIES,
BLOG_DATA,
BlogCategory,
} from '../data/blog';
import { useSEO } from '../lib/seo';
import { ResilientImage } from '../components/ResilientImage';
import { BookingCTA } from '../components/BookingCTA';

export const Blog: React.FC = () => {
useSEO({
title: 'Insights on Web Development, Design Systems & SEO | NOVARIYAN',
description:
'Editorial articles and technical insights from Novariyan covering high-performance web development, digital design systems, and technical SEO.',
path: '/blog',
});

const [selectedCategory, setSelectedCategory] =
useState<BlogCategory>('ALL');

const [searchQuery, setSearchQuery] = useState('');

const featuredArticle =
BLOG_DATA.find((article) => article.featured) ??
BLOG_DATA[0];

const normalizedSearchQuery = searchQuery
.trim()
.toLowerCase();

const filteredArticles = useMemo(() => {
return BLOG_DATA.filter((article) => {
const matchesCategory =
selectedCategory === 'ALL' ||
article.category === selectedCategory;


  if (!normalizedSearchQuery) {
    return matchesCategory;
  }

  const matchesSearch =
    article.title
      .toLowerCase()
      .includes(normalizedSearchQuery) ||
    article.excerpt
      .toLowerCase()
      .includes(normalizedSearchQuery) ||
    article.category
      .toLowerCase()
      .includes(normalizedSearchQuery);

  return matchesCategory && matchesSearch;
});


}, [
normalizedSearchQuery,
selectedCategory,
]);

return ( <div className="bg-[#F5F5F2] text-[#0A0A0A]">
{/* Header */} <section className="py-16 lg:py-24 bg-architectural-grid border-b border-[#0A0A0A]/12"> <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12"> <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
Studio Journal & Technical Notes </p>

      <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#0A0A0A] mb-6">
        INSIGHTS &amp; PERSPECTIVES.
      </h1>

      <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl mb-10">
        Essays on modern web architecture, editorial design systems,
        Core Web Vitals performance, and technical search visibility.
      </p>

      {/* Featured Article Banner */}
      {featuredArticle && (
        <Link
          to={`/blog/${featuredArticle.slug}`}
          aria-label={`Read featured article: ${featuredArticle.title}`}
          className="group grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden bg-[#0A0A0A] text-[#F5F5F2] border border-[#0A0A0A]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-4"
        >
          <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#141414]">
            <ResilientImage
              src={featuredArticle.heroImage}
              alt={featuredArticle.title}
              fallbackLabel={featuredArticle.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              containerClassName="w-full h-full"
            />
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono-tech text-xs text-neutral-400 mb-4">
                <span>FEATURED ARTICLE</span>
                <span aria-hidden="true">·</span>
                <span>{featuredArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredArticle.readingTime}</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl text-white tracking-wide mb-4 group-hover:underline">
                {featuredArticle.title}
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-8 border-t border-white/12 flex items-center justify-between">
              <span className="font-mono-tech text-xs text-neutral-400">
                {featuredArticle.date}
              </span>

              <span className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase tracking-wider text-white">
                <span>Read Full Essay</span>

                <ArrowUpRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </Link>
      )}

      {!featuredArticle && (
        <div
          className="p-10 rounded-2xl bg-white border border-[#0A0A0A]/10"
          role="status"
        >
          <p className="font-display text-2xl text-[#0A0A0A]">
            JOURNAL CONTENT COMING SOON.
          </p>
        </div>
      )}
    </div>
  </section>

  {/* Filter & Search Bar + Article Grid */}
  <section className="py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#0A0A0A]/12 mb-12">
        {/* Categories */}
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter articles by category"
        >
          {BLOG_CATEGORIES.map((category) => {
            const active =
              selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`px-4 py-2 rounded-full font-mono-tech text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 ${
                  active
                    ? 'bg-[#0A0A0A] text-[#F5F5F2]'
                    : 'bg-white text-neutral-600 border border-[#0A0A0A]/12 hover:border-[#0A0A0A]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <label
            htmlFor="blog-search"
            className="sr-only"
          >
            Search blog articles
          </label>

          <Search
            className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />

          <input
            id="blog-search"
            name="blog-search"
            type="search"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            placeholder="Search articles..."
            autoComplete="off"
            maxLength={100}
            className="w-full rounded-full bg-white border border-[#0A0A0A]/15 pl-10 pr-4 py-2.5 text-sm text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10"
          />
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div
          className="p-12 text-center rounded-2xl bg-white border border-[#0A0A0A]/10"
          role="status"
          aria-live="polite"
        >
          <p className="font-display text-2xl text-[#0A0A0A] mb-2">
            NO ARTICLES MATCH YOUR FILTER
          </p>

          <p className="text-sm text-neutral-600 mb-6">
            Try clearing your search query or switching categories.
          </p>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory('ALL');
              setSearchQuery('');
            }}
            className="rounded-full bg-[#0A0A0A] text-[#F5F5F2] px-5 py-2.5 text-xs font-mono-tech uppercase tracking-wider cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              aria-label={`Read article: ${post.title}`}
              className="group flex flex-col justify-between rounded-2xl border border-[#0A0A0A]/12 bg-white overflow-hidden hover:border-[#0A0A0A]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-4"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#141414]">
                  <ResilientImage
                    src={post.heroImage}
                    alt={post.title}
                    fallbackLabel={post.category}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    containerClassName="w-full h-full"
                  />
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2 font-mono-tech text-xs text-neutral-500 mb-3">
                    <span>{post.category}</span>

                    <span aria-hidden="true">·</span>

                    <span>{post.readingTime}</span>
                  </div>

                  <h2 className="text-xl font-semibold tracking-tight text-[#0A0A0A] mb-3 group-hover:underline">
                    {post.title}
                  </h2>

                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#0A0A0A]/10 flex items-center justify-between">
                <span className="font-mono-tech text-xs text-neutral-500">
                  {post.date}
                </span>

                <span className="inline-flex items-center gap-1 font-mono-tech text-xs uppercase tracking-wider text-[#0A0A0A]">
                  <span>Read</span>

                  <ArrowUpRight
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  </section>

  <BookingCTA />
</div>


);
};
