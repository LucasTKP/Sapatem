import { ProductModel } from "@/src/models/product";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";
import DialogCreateProduct from "./dialog_create_product/dialog_create_product";

interface HeaderProps {
  products: ProductModel[];
  setTextSearch: React.Dispatch<React.SetStateAction<string>>;
  setPagination: React.Dispatch<
    React.SetStateAction<{
      page: number;
      maxPage: number;
      minPage: number;
    }>
  >;
  onGetProducts: () => void;
}

function Header({ products, setTextSearch, setPagination, onGetProducts }: HeaderProps) {
  return (
    <div className="flex p-[15px] max-xsm:p-[10px] items-center justify-between gap-x-[15px] rounded-t-[8px] bg-primary text-background ">
      <p className="text-[18px] max-sm:text-[16px] text-nowrap">
        <span className="font-[500] text-white">{products.length}</span>{" "}
        produtos
      </p>
      <label className="flex justify-between border-background border-[1px] rounded-[5px] items-center px-[5px] w-[60%] max-xsm:text-[14px]">
        <input
          type="text"
          placeholder="Nome do produto"
          className="rounded-l-[5px] bg-transparent outline-none w-full placeholder:text-background"
          onChange={(e) => {
            setTextSearch(e.target.value),
              setPagination({
                page: 1,
                maxPage: 8,
                minPage: 1,
              });
          }}
        />
        <MagnifyingGlassIcon width={20} height={20} />
      </label>
      <DialogCreateProduct onGetProducts={onGetProducts}/>
    </div>
  );
}

export default Header;
