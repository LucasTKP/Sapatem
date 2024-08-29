"use client";
import Footer from "@/src/components/footer";
import Hero from "@/src/components/hero";
import SectionProducts from "@/src/components/section_products/section_products";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <SectionProducts categoryId={13} categoryName="sapatos" title={"Sapatos"} background="bg-terciary/50" />
      <SectionProducts categoryId={2} categoryName="carteiras" title={"Eletrônicos"}  background="bg-background"/>
      <Footer />
    </div>
  );
}
