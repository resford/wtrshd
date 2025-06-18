import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog-card";
import { sanityFetch } from "@/lib/sanity/live";
import { queryBlogTagPageData } from "@/lib/sanity/query";

export default async function BlogTagPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const data = await sanityFetch({
    query: queryBlogTagPageData,
    params: { slug },
  });

  if (!data) return notFound();

  const {
    data: { title, description, blogs },
  } = await sanityFetch({
    query: queryBlogTagPageData,
    params: { slug },
  });

  return (
    <main className="bg-background">
      <div className="container my-16 mx-auto px-4 md:px-6">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold">{title}</h1>
          {description && (
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          )}
        </header>

        {blogs?.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
            {blogs.map((blog: any) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center">
            No blog posts for this tag yet.
          </p>
        )}
      </div>
    </main>
  );
}

export async function generateStaticParams() {
    const { data } = await sanityFetch({
      query: `*[_type == "tag" && defined(slug.current)]{
        "slug": slug.current
      }`,
    });
  
    return data.map((tag: { slug: string }) => ({
      slug: tag.slug,
    }));
  }