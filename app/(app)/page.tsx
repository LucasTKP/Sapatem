"use client";
import Hero from "@/src/components/hero";
import SectionProducts from "@/src/components/section_products/section_products";
import { CategoriesContext } from "@/src/context/categories";
import { useContext } from "react";

export default function Home() {
  const { categories } = useContext(CategoriesContext);
  return (
    <main>
      <Hero />
      <SectionProducts
        categoryId={categories ? categories[0].id : 0}
        categoryName="sapatos"
        title={"Sapatos"}
        background="bg-terciary/50"
        darkMode={false}
      />
      <SectionProducts
        categoryId={categories ? categories[1].id : 0}
        categoryName="carteiras"
        title={"Carteiras"}
        background="bg-background"
        darkMode={true}
      />
      <SectionProducts
        categoryId={categories ? categories[2].id : 0}
        categoryName="cintos"
        title={"Cintos"}
        background="bg-terciary/50"
        darkMode={false}
      />
    </main>
  );
}
