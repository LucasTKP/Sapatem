import React from "react";
import Image from "next/image";
import Shoes from "@/assets/images/shoes_hero.png";

export default function Hero() {
  return (
    <section className="px-[10%] max-md:px-[2%] mt-[30px] max-md:mt-[20px]">
      <Image
        src={Shoes}
        alt="logo"
        quality={100}
        width={10000}
        className="w-full aspect-[9/4] rounded-[10px] hover:brightness-90 cursor-pointer duration-200"
        priority
      />
    </section>
  );
}
