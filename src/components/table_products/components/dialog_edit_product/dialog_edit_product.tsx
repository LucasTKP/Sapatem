"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Select, { StylesConfig } from "react-select";
import { CategoriesContext } from "@/src/context/categories";
import { ProductModel } from "@/src/models/product";
import Image from "next/image";
import dialogEditController from "@/src/controllers/dialog_edit_controller";

interface DialogEditProductProps {
  onGetProducts: () => void;
  productSelected: ProductModel;
  setProductSelected: React.Dispatch<React.SetStateAction<ProductModel | null>>;
}

function DialogEditProduct({
  onGetProducts,
  productSelected,
  setProductSelected,
}: DialogEditProductProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { categories } = useContext(CategoriesContext);
  const [optionsInput, setOptionsInput] = useState<
    { value: number; label: string }[]
  >([]);
  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid #7B3C1B",
      borderRadius: "8px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#D9BBA9" : "white",
      color: "black",
    }),
  };

  useEffect(() => {
    if (categories) {
      const options = [];
      for (let category of categories) {
        options.push({
          value: category.id,
          label: category.name.split("-")[0],
        });
      }
      setOptionsInput(options);
    }
  }, [categories]);

  return (
    <Dialog.Root open={productSelected ? true : false}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => setProductSelected(null)}
          className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-10 "
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]  w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-10 flex flex-col text-primary overflow-y-auto max-h-[90%]">
          <Dialog.Title className="text-[20px] font-medium text-primary text-center">
            Edição de produto
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-5 text-[15px] text-center">
            Altere as informações nos campos abaixo
          </Dialog.Description>
          <form
            onSubmit={(e) => {
              dialogEditController.OnEditProduct({
                e,
                setIsLoading,
                onGetProducts,
                productSelected,
                setProductSelected,
              });
            }}
            className="flex flex-col items-start gap-y-[8px]"
          >
            <label className="w-full" htmlFor="title">
              <p className="text-[15px] font-[500]">Nome:</p>
              <input
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/90"
                name="title"
                placeholder="Escreva o nome do produto"
                type="text"
                defaultValue={productSelected.title}
                required
              />
            </label>

            <label className="w-full" htmlFor="price">
              <p className="text-[15px] font-[500]">Preço:</p>
              <input
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/90"
                name="price"
                placeholder="Digite o preço"
                type="number"
                step="0.01"
                defaultValue={productSelected.price}
                required
              />
            </label>

            <label className="w-full" htmlFor="description">
              <p className="text-[15px] font-[500]">Descrição:</p>
              <textarea
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/90"
                name="description"
                rows={4}
                placeholder="Adicione a descrição do produto"
                defaultValue={productSelected.description}
                required
              />
            </label>

            <div className="flex items-center justify-between w-full max-xsm:flex-col">
              <label className="flex flex-col w-full">
                <p className="text-[15px] font-[500]">Categoria</p>
                <Select
                  options={optionsInput}
                  required={true}
                  name="category"
                  defaultValue={optionsInput.find(
                    (option) => option.value === productSelected.category.id
                  )}
                  styles={customStyles}
                  placeholder="Selecione uma categoria"
                />
              </label>
            </div>
            <div className="w-full">
              <p className="text-[15px] font-[500]">Imagens já cadastradas:</p>
              <div className="flex overflow-x-auto space-x-4 py-[5px]">
                {productSelected.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg border border-black"
                  >
                    <Image
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="min-w-[150px] max-md:min-w-[130px] rounded-lg aspect-[8/10]"
                      width={160}
                      height={160}
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 left-0 w-full bg-red-500 text-white py-1 bg-opacity-75 hover:bg-opacity-100"
                      onClick={() =>
                        dialogEditController.removeImages({
                          urlImage: image,
                          setProductSelected,
                          productSelected,
                        })
                      }
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full">
              <label className="flex flex-col w-full">
                <div className="flex justify-between">
                  <p className="text-[15px] font-[500]">Imagens</p>

                  <p className="text-[14px] whitespace-nowrap text-end mt-[2px]">
                    Suba imagens na proporção 8:10
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full p-[8px] rounded-[4px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/60"
                  required={productSelected.images.length === 0}
                />
              </label>
            </div>
            <div className="flex w-full justify-between mt-[15px]">
              <Dialog.Close asChild>
                <button
                  className="bg-red-600 text-background hover:brightness-95 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                  disabled={isLoading}
                  onClick={() =>
                    dialogEditController.deleteProduct({
                      setIsLoading,
                      idProduct: productSelected.id,
                      setProductSelected,
                      onGetProducts,
                    })
                  }
                >
                  {isLoading ? (
                    <div className="relative flex items-center justify-center w-[25px] h-[25px] rounded-full border-[6px] border-t-gray-400 border-background animate-spin" />
                  ) : (
                    "Excluir"
                  )}
                </button>
              </Dialog.Close>
              <button
                className="bg-green-600 text-background hover:brightness-95 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                type={"submit"}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="relative flex items-center justify-center w-[25px] h-[25px] rounded-full border-[6px] border-t-gray-400 border-background animate-spin" />
                ) : (
                  "Salvar"
                )}
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              onClick={() => setProductSelected(null)}
              className="absolute top-[10px] right-[10px] h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon width={25} height={25} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DialogEditProduct;
