import { siteConfig } from "@/config/site";
import Link from "next/link";

const SiteFooter = () => {
  return (
    <footer>
      <div className="container py-10 md:py-0 md:h-20">
        <p className="text-center md:text-left">
          Built by {""}
          <Link
            href={siteConfig.links.x}
            className="font-bold underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            Nari Code
          </Link>
          . Hosted on {""}
          <Link
            href={"https://vercel.com"}
            className="font-bold underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            Vercel
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
