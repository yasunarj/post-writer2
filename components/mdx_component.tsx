"use client";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import Callout from "./callout";

const components = {
  Callout,
  Image
}

const Mdx = ({ code }: { code: string }) => {
  const Component = useMDXComponent(code);

  return (
    <div className="prose lg:prose-xl max-w-full prose-stone">
      <Component components={components} />
    </div>
  );
};

export default Mdx;
