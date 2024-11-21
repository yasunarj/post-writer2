import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";
import { allPosts } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Mdx from "@/components/mdx_component";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

const getPostFromSlug = async (slug: string) => {
  const post = allPosts.find((post) => post.slugAsParams === slug);
  return post;
};

const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
  const page = await getPostFromSlug(params.slug);
  if (page) {
    return {
      title: page.title,
      description: page.description,
      openGraph: {
        type: "article",
        locale: "ja",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name
      },
      twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [`${siteConfig.url}/og.jpg`],
        creator: "@NariCode",
      },
    };
  }
  return {}
};

const PostPage = async ({ params }: { params: { slug: "string" } }) => {
  const slug = params.slug;
  const post = await getPostFromSlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-6 lg:py-10">
      <div>
        {post.date && <time>Publish on {format(post.date, "yyyy/MM/dd")}</time>}
      </div>
      <h1 className="text-center mt-2 font-extrabold text-4xl lg:text-5xl leading-tight">
        {post.title}
      </h1>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="my-8 border rounded-md bg-muted"
        />
      )}
      <Mdx code={post.body.code} />
      <hr className="mt-12" />
      <div className="text-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          全てを見る
        </Link>
      </div>
    </article>
  );
};

export { generateMetadata };
export default PostPage;
