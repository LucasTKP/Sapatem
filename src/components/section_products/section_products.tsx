"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "./components/card_product";
import productController from "@/src/controllers/product_controller";
import { createProduct, ProductModel } from "@/src/models/product";
import Link from "next/link";

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
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(5);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

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
          `Não foi possível carregar os produtsos da categoria ${categoryName}`
        );
      } finally {
        setLoading(false);
      }
    }
    if (categoryId != 0) onGetProducts();
  }, [categoryId, categoryName]);

  function applyOrder(filter: FilterType) {
    setCurrentPage(1);
    let arrayProducts = products;
    switch (filter) {
      case FilterType.PRICE_ASC:
        arrayProducts =
          productController.sortProductsByPriceAscending(products);
        break;
      case FilterType.PRICE_DESC:
        arrayProducts =
          productController.sortProductsByPriceDescending(products);
        break;
      case FilterType.NAME_ASC:
        arrayProducts =
          productController.sortProductsByCategoryAscending(products);
        break;
      case FilterType.NAME_DESC:
        arrayProducts =
          productController.sortProductsByCategoryDescending(products);
        break;
    }
    setProducts([...arrayProducts]);
  }

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
        <>
          <div className="flex flex-col items-end">
            <label htmlFor="filter" className="mr-2 font-bold text-black">
              Ordenar por:
            </label>
            <select
              id="filter"
              onChange={(event) => applyOrder(event.target.value as FilterType)}
              className="border rounded p-1 bg-transparent border-black text-black"
            >
              <option value="">Selecione um filtro</option>
              <option value={FilterType.PRICE_ASC}>Preço: Crescente</option>
              <option value={FilterType.PRICE_DESC}>Preço: Decrescente</option>
              <option value={FilterType.NAME_ASC}>Nome: Crescente</option>
              <option value={FilterType.NAME_DESC}>Nome: Decrescente</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-[25px] max-xl:gap-[20px] max-lg:gap-[15px] max-md:gap-[10px] mt-[10px] justify-center items-center">
            {currentProducts.map((product) => (
              <div key={product.id}>
                <CardProduct product={product} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-[10px] gap-x-[8px]">
            {pageNumbers.map((number) => (
              <Link
                key={number}
                onClick={() => paginate(number)}
                href={`#${title.toLocaleLowerCase()}`}
                className={`text-black text-[18px] ${
                  currentPage === number ? "underline" : ""
                }`}
              >
                {number}
              </Link>
            ))}
          </div>
        </>
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

enum FilterType {
  PRICE_ASC = "PRICE_ASC",
  PRICE_DESC = "PRICE_DESC",
  NAME_ASC = "NAME_ASC",
  NAME_DESC = "NAME_DESC",
}
