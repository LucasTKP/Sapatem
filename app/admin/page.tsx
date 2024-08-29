import TableProducts from "@/src/components/table_products/table_products";
import React from "react";

export default function Page() {
  return (
    <section className="text-black px-[10%] max-lg:px-[6%] max-md:px-[2%]">
      <div className="mt-[20px] w-full flex flex-col items-center">
        <p className="text-[35px] font-[500]">Gerencie os produtos da loja online</p>
        <TableProducts />
      </div>
    </section>
  );
}
