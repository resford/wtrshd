"use client";

import { useState } from "react";
import { BlogCard } from "./blog-card";

type Tag = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
};

type Blog = {
  _id: string;
  title: string;
  slug: { current: string };
  image?: any;
  publishedAt?: string;
  tags?: Tag[];
};

export function BlogFilter({
  blogs,
  tags,
}: {
  blogs: Blog[];
  tags: Tag[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredBlogs = activeTag
    ? blogs.filter((blog) =>
        blog.tags?.some((tag) => tag.slug.current === activeTag)
      )
    : blogs;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 rounded border ${
            !activeTag ? "bg-black text-white" : "bg-gray-100"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag._id}
            onClick={() => setActiveTag(tag.slug.current)}
            className={`px-3 py-1 rounded border ${
              activeTag === tag.slug.current ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            {tag.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </>
  );
}
