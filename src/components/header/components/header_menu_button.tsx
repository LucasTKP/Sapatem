import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  href: string;
  onClick: Function;
}

export default function HeaderMenuButton({ title, href, onClick }: Props) {
  return (
    <li onClick={() => onClick()} className="relative text-[#555555] cursor-pointer before:w-10 before:h-[2px] before:absolute before:bg-primary before:bottom-0">
      <Link href={href}>{title}</Link>
    </li>
  );
}
