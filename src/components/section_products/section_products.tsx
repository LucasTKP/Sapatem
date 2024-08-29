import { axiosInstance } from "@/src/libs/axios";
import { createProduct, Product } from "@/src/models/product";
import React, { useEffect, useState } from "react";
import CardProduct from "./components/card_product";

interface Props {
    categoryId: number;
    categoryName: string;
    title: string;
    background: string;
}

export default function SectionProducts({ categoryId, categoryName, title, background }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`/products/?categoryId=${categoryId}`)
      .then((res) => {
        const fetchedProducts = res.data.map((productData: any) => {
          return createProduct({
            id: productData.id,
            title: productData.title,
            price: productData.price,
            description: productData.description,
            category: productData.category,
            images: productData.images,
          });
        });
  
        const duplicatedProducts = Array.from({ length: 6 }, (_, i) => fetchedProducts[i % fetchedProducts.length]);
  
        setProducts(duplicatedProducts);
      })
      .catch((error) => console.error("Erro ao buscar produtos", error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <section id={categoryName} className={`mt-[20px] px-[10%] max-lg:px-[6%] max-md:px-[2%] py-[30px] ${background}`}>
      <div className="flex items-center gap-x-[5px]">
        <div className="w-full h-[2px] bg-black"/>
        <h4 className="font-bold text-[30px] text-black">{title}</h4>
        <div className="w-full h-[2px] bg-black"/>
      </div>
      <div className="flex flex-wrap gap-[30px] max-xl:gap-[25px] max-lg:gap-[20px] max-md:gap-[15px] mt-[30px] justify-center">
        {products.map((product) => (
          <div key={product.id}>
            <CardProduct product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}


  
