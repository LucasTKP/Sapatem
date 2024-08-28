"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import HeaderButton from "./components/header_button";
import HeaderMenu from "./components/header_menu";

export default function Header() {
  return (
    <section className="w-full flex justify-between items-center bg-terciary px-[10%] py-[15px] max-md:py-[5px]">
      <Image src={logo} alt="logo" width={100} className="max-md:w-[80px]"/>
      <div className="flex gap-x-[100px] max-lg:gap-x-[80px] ml-[100px] max-md:hidden">
        <HeaderButton title="Sapatos" href="/" />
        <HeaderButton title="Carteiras" href="/" />
        <HeaderButton title="Cintos" href="/" />
      </div>
      <div className="md:hidden">
        <HeaderMenu />
      </div>
    </section>
  );
}
