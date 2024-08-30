"use client";
import React, { useContext, useEffect, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Image from "next/image";
import { ProductModel } from "@/src/models/product";
import productController from "@/src/controllers/product_controller";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { CategoriesContext } from "@/src/context/categories";

interface typeFilters {
  category: "asc" | "desc";
  price: "asc" | "desc";
}

function TableProducts() {
  const { categories } = useContext(CategoriesContext);

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [productSelected, setProductSelected] = useState<ProductModel | null>(
    null
  );
  const [textSearch, setTextSearch] = useState<string>("");
  const [filters, setFilters] = useState<typeFilters>({
    category: "asc",
    price: "asc",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    maxPage: 8,
    minPage: 1,
  });

  useEffect(() => {
    if (categories) onGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  async function onGetProducts() {
    if (categories && categories.length > 1) {
      try {
        const [shoes, wallets, belts] = await Promise.all([
          productController.getProductsByCategory(categories[0].id),
          productController.getProductsByCategory(categories[1].id),
          productController.getProductsByCategory(categories[2].id),
        ]);

        setProducts([...shoes, ...wallets, ...belts]);
      } catch (e) {
        console.error(e);
        alert(`Não foi possível carregar os produtos.`);
      } finally {
        setLoading(false);
      }
    }
  }

  function handleOrderCategory() {
    setFilters({
      category: filters.category == "asc" ? "desc" : "asc",
      price: "asc",
    });
    if (filters.category == "asc") {
      productController.sortProductsByCategoryAscending(products);
    } else {
      productController.sortProductsByCategoryDescending(products);
    }
  }

  function handleOrderPrice() {
    setFilters({
      category: "asc",
      price: filters.price == "asc" ? "desc" : "asc",
    });
    if (filters.price == "asc") {
      productController.sortProductsByPriceAscending(products);
    } else {
      productController.sortProductsByPriceDescending(products);
    }
  }

  return (
    <div className="mt-[20px] max-w-[800px] w-full min-h-[515px] max-sm:min-h-[480px] max-xsm:min-h-[460px] border-terciary border-[1px] rounded-[10px] flex flex-col flex-1">
      <Header
        products={products}
        setTextSearch={setTextSearch}
        setPagination={setPagination}
        onGetProducts={onGetProducts}
      />
      {products.length == 0 ? (
        loading ? (
          <div
            className={
              "relative flex items-center justify-center w-[50px] h-[50px] rounded-full border-[7px] border-t-primary/50 border-[#5c5b5b] animate-spin mx-auto ml-auto mt-auto mb-auto"
            }
          />
        ) : (
          <p className="w-full h-[200px] flex items-center justify-center mx-auto ml-auto mt-auto mb-auto">
            Nenhum produto foi encontrado
          </p>
        )
      ) : (
        <>
          <div className="grid grid-cols-[40px_1fr_100px_190px] max-sm:grid-cols-[35px_1fr_100px_100px] gap-[10px] max-xsm:gap-[5px] px-[10px] border-y-[1px] border-terciary bg-terciary/20 items-center text-[17px] max-xsm:text-[16px] font-[600] py-[5px] ">
            <p className="col-start-2">Nome</p>

            <button
              onClick={() => handleOrderCategory()}
              className="flex items-center justify-center"
            >
              <p>Categoria</p>
              <TriangleDownIcon
                className={`${
                  filters.category == "asc" ? "" : "rotate-180"
                } duration-200`}
              />
            </button>

            <button
              onClick={() => handleOrderPrice()}
              className="flex items-center justify-center"
            >
              <p>Preço</p>
              <TriangleDownIcon
                className={`${
                  filters.price == "asc" ? "" : "rotate-180"
                } duration-200`}
              />
            </button>
          </div>

          {productController.searchProducts({ products, textSearch }).length >
          0 ? (
            (() => {
              const result = [];
              const filteredUsers = productController.searchProducts({
                products,
                textSearch,
              });
              for (let i = 0; i < filteredUsers.length; i++) {
                const product = filteredUsers[i];

                if (i + 1 < pagination.minPage) continue;
                if (i + 1 > pagination.maxPage) break;

                result.push(
                  <div
                    onClick={() => setProductSelected(product)}
                    key={product.id}
                    className="grid grid-cols-[40px_1fr_100px_190px] max-sm:grid-cols-[35px_1fr_100px_100px] gap-[10px] max-xsm:gap-[5px] px-[10px] py-[3px] border-b-[1px] border-terciary bg-background hover:brightness-90 cursor-pointer max-xsm:text-[15px] items-center"
                  >
                    <Image
                      alt="perfil"
                      src={product.images[0]}
                      width={40}
                      height={40}
                      className="rounded-full border-[1px] border-black aspect-square max-sm:w-[35px]"
                    />

                    <p className="truncate">{product.title}</p>

                    <p className="text-center whitespace-nowrap">
                      {product.category.name.split("-")[0]}
                    </p>

                    <p className="text-center">R${product.price.toFixed(2)}</p>
                  </div>
                );
              }
              return result;
            })()
          ) : (
            <p className="w-full h-[200px] flex items-center justify-center">
              Nenhum produto foi encontrado com este nome
            </p>
          )}
          <Footer
            products={products}
            textSearch={textSearch}
            pagination={pagination}
            setPagination={setPagination}
          />
        </>
      )}
      {/* {userSelect && (
        <DialogEditUser
          setUsers={setUsers}
          userSelect={userSelect}
          setUserSelect={setUserSelect}
        />
      )} */}
    </div>
  );
}

export default TableProducts;
