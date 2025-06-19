"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { BlogCard } from "./blog-card";

type Tag = {
  _id: string;
  title: string;
  slug: { current: string };
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
          className={cn("tag-button", !activeTag && "tag-button-active")}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag._id}
            onClick={() => setActiveTag(tag.slug.current)}
            className={cn(
              "tag-button",
              activeTag === tag.slug.current && "tag-button-active"
            )}
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
