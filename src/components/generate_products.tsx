"use client";
import React, { useContext, useState } from "react";
import { products } from "@/src/data/products";
import { CategoriesContext } from "../context/categories";
import productService from "../services/product_service";
import { toast } from "react-toastify";

interface ButtonGenerateProductsProps {
  onGetProducts: () => Promise<void>;
}

export default function ButtonGenerateProducts({
  onGetProducts,
}: ButtonGenerateProductsProps) {
  const { categories } = useContext(CategoriesContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerateProducts() {
    if (categories) {
      try {
        setIsLoading(true);
        for (let product of products) {
          if (product.categoryId === "1") {
            product.categoryId = categories[0].id.toString();
          }

          if (product.categoryId === "2") {
            product.categoryId = categories[1].id.toString();
          }

          if (product.categoryId === "3") {
            product.categoryId = categories[2].id.toString();
          }
          await productService.uploadProduct(product);
        }
        await onGetProducts();
        toast.success("Produtos gerados com sucesso");
      } catch (e) {
        toast.error("Erro ao gerar produtos");
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <button
      className="bg-terciary/40 px-[10px] rounded-[5px] border-[1px] border-terciary hover:bg-terciary/50 duration-200 mr-auto py-[3px]"
      onClick={handleGenerateProducts}
      disabled={isLoading}
    >
      {isLoading ? (
        <div
          className={`relative flex items-center justify-center w-[25px] h-[25px] rounded-full border-[5px] border-t-black border-white animate-spin`}
        />
      ) : (
        "Gerar Produtos"
      )}
    </button>
  );
}
