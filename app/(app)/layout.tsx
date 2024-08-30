"use client";
import { CategoriesContext } from "@/src/context/categories";
import categoryController from "@/src/controllers/category_controller";
import { CategoryContextModel } from "@/src/models/category";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, setCategories] = useState<CategoryContextModel[] | undefined>();

  //Infelizmente qualquer pessoa pode utilizar a rota delete da API https://fakeapi.platzi.com/ por
  //isso fiz uma verificação se as categorias que eu cadastrei ainda existem, e se não existir cria novamente.
  useEffect(() => {
    if (categories === undefined) onGetCategories();
  }, [categories]);

  async function onGetCategories() {
    try {
      const categories = await categoryController.getCategories();
      setCategories(categories);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}
