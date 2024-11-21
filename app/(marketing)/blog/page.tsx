import Link from "next/link";
import Image from "next/image";
import { allPosts } from "@/.contentlayer/generated";
import { format } from "date-fns";

const BlogPage = () => {
  const posts = allPosts;
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div>
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
            Blog🚀
          </h1>
          <p className="text-muted-foreground text-xl">
            ContentLayerとMDXで書いています。
          </p>
        </div>
        <hr className="my-8" />
        <div className="grid sm:grid-cols-2 gap-10">
          {posts.map((post) => {
            return (
              <article key={post._id} className="relative">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={804}
                    height={452}
                    className="rounded-md border bg-muted"
                  />
                )}
                <h2 className="font-extrabold text-2xl">{post.title}</h2>
                {post.description && (
                  <p className="text-muted-foreground">{post.description}</p>
                )}
                {post.date && (
                  <p className="text-muted-foreground">
                    {format(post.date, "yyyy/MM/dd")}
                  </p>
                )}
                <Link href={post.slug} className="absolute inset-0"></Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
