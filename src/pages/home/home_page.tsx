"use client";
import Footer from "@/src/components/footer";
import Hero from "@/src/components/hero";
import SectionProducts from "@/src/components/section_products/section_products";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <SectionProducts categoryId={13} categoryName="sapatos" title={"Sapatos"} background="bg-terciary/50" darkMode={false} />
      <SectionProducts categoryId={30} categoryName="carteiras" title={"Carteiras"}  background="bg-background" darkMode={true}/>
      <SectionProducts categoryId={2} categoryName="cintos" title={"Cintos"}  background="bg-terciary/50" darkMode={false}/>
      <Footer />
    </div>
  );
}
