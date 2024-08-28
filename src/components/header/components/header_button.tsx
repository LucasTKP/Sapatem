import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  href: string;
}

export default function HeaderButton({ title, href }: Props) {
  return (
    <Link
      href={href}
      className="group relative after:w-[0px] after:h-[2px] after:bg-background after:brightness-90 after:absolute after:rounded-full after:duration-200 hover:after:w-full after:bottom-[2px] after:left-0"
    >
      <h1 className="font-[600] text-[20px] max-lg:text-[18px] group-hover:brightness-90">
        {title}
      </h1>
    </Link>
  );
}
