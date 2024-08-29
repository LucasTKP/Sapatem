import { axiosInstance } from "@/src/libs/axios";
import { createProduct, Product } from "@/src/models/product";
import React, { useEffect, useState } from "react";
import CardProduct from "./components/card_product";
import productController from "@/src/controllers/product_controller";

interface Props {
  categoryId: number;
  categoryName: string;
  title: string;
  background: string;
  darkMode: boolean;
}

export default function SectionProducts({
  categoryId,
  categoryName,
  title,
  background,
  darkMode,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function onGetProducts() {
      try {
        const response = await productController.getProductsByCategory(
          categoryId
        );
        setProducts(response);
      } catch (e) {
        console.error(e);
        alert(
          `Não foi possível carregar os produtos da categoria ${categoryName}`
        );
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    }

    onGetProducts();
  }, [categoryId, categoryName]);

  return (
    <section
      id={categoryName}
      className={`mt-[20px] px-[10%] max-lg:px-[6%] max-md:px-[2%] py-[30px] ${background} min-h-[400px] flex flex-col `}
    >
      <div className="flex items-center gap-x-[5px]">
        <div className="w-full h-[2px] bg-black" />
        <h4 className="font-bold text-[30px] max-lg:text[26px] max-md:text-[24px] text-black">
          {title}
        </h4>
        <div className="w-full h-[2px] bg-black" />
      </div>
      {products.length > 0 ? (
        <div className="flex flex-wrap gap-[30px] max-xl:gap-[25px] max-lg:gap-[20px] max-md:gap-[15px] mt-[30px] justify-center items-center">
          {products.map((product) => (
            <div key={product.id}>
              <CardProduct product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-auto mb-auto flex flex-col items-center justify-center">
          {loading ? (
            <div
              className={`relative flex items-center justify-center w-[50px] h-[50px] rounded-full border-[7px] ${
                darkMode
                  ? "border-t-primary/50 border-[#5c5b5b]"
                  : "border-t-black border-white"
              }  animate-spin`}
            />
          ) : (
            <p className="text-center text-[20px] font-[700] self-center justify-self-center text-black underline">
              Produtos indisponíveis!
            </p>
          )}
        </div>
      )}
    </section>
  );
}
