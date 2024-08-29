"use client";
import React from "react";
import Image from "next/image";
import HeaderButton from "./components/header_button";
import HeaderMenu from "./components/header_menu";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center bg-primary px-[10%] py-[15px] max-md:py-[5px]">
      <Image src={'/images/logo.png'} alt="logo" width={100} height={100} className="max-md:w-[80px]"/>
      <div className="flex gap-x-[100px] max-lg:gap-x-[80px] ml-[100px] max-md:hidden">
        <HeaderButton title="Sapatos" href="/#sapatos" />
        <HeaderButton title="Carteiras" href="/#carteiras" />
        <HeaderButton title="Cintos" href="/" />
      </div>
      <div className="md:hidden">
        <HeaderMenu />
      </div>
    </header>
  );
}
