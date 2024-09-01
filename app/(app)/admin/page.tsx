import TableProducts from "@/src/components/table_products/table_products";

export default function Page() {
  return (
    <section className="text-black px-[10%] max-lg:px-[6%] max-md:px-[2%] pb-[100px]">
      <div className="mt-[20px] w-full flex flex-col items-center">
        <p className="text-[35px] max-lg:text-[32px] max-md:text-[30px] font-[500]">
          Gerencie os produtos da loja online
        </p>
        <TableProducts />
      </div>
    </section>
  );
}
