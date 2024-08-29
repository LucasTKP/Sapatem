"use client";
import React from "react";
import Image from "next/image";
import HeaderButton from "./components/header_button";
import HeaderMenu from "./components/header_menu";
import logo from "@/public/images/logo.png";


export default function Header() {
  return (
    <header className="w-full flex justify-between items-center bg-primary px-[10%] max-lg:px-[6%] py-[15px] max-md:py-[5px]">
      <Image className="w-[100px] h-auto" src={logo} width={420} height={381} alt="Logo Sapatem" />
      <div className="flex gap-x-[100px] max-lg:gap-x-[80px] ml-[100px] max-md:hidden">
        <HeaderButton title="Sapatos" href="#sapatos" />
        <HeaderButton title="Carteiras" href="#carteiras" />
        <HeaderButton title="Cintos" href="#cintos" />
      </div>
      <div className="md:hidden">
        <HeaderMenu />
      </div>
    </header>
  );
}
