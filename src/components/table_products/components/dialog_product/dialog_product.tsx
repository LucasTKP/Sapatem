"use client";
import React, { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Select, { StylesConfig } from "react-select";
import { ProductModel } from "@/src/models/product";
import Image from "next/image";
import EditImageProfile from "./edit_image_profile/edit_image_profile";
import dialogCreateController from "@/src/controllers/dialog_create_controller";

interface DialogCreateProductProps {
  onGetProducts: () => void;
}

function DialogCreateProduct({ onGetProducts }: DialogCreateProductProps) {
  const [isLoading, setIsLoading] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

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
  const options = [
    { value: 28, label: "Sapatos" },
    { value: 19, label: "Cintos" },
    { value: 20, label: "Carteiras" },
  ];

  function onCloseDialog() {
    if (cancelButtonRef.current) {
      cancelButtonRef.current.click();
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-background text-black px-[20px] max-xsm:px-[10px] py-[3px] max-xsm:py-[1px] font-[500] max-xsm:text-[13px] rounded-[5px] hover:brightness-95 duration-200">
          Cadastrar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-10 " />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]  w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-10 flex flex-col text-primary ">
          <Dialog.Title className="text-[20px] font-medium text-primary text-center">
            Cadastro de produto
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-5 text-[15px] text-center">
            Adicione as informações nos campos abaixo
          </Dialog.Description>
          <form
            onSubmit={(e) =>
              dialogCreateController.onCreateProduct({
                e,
                setIsLoading,
                onGetProducts,
                onCloseDialog,
              })
            }
            className="flex flex-col items-start gap-y-[8px]"
          >
            <label className="w-full" htmlFor="title">
              <p className="text-[15px] font-[500]">Nome:</p>
              <input
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/90"
                name="title"
                placeholder="Escreva o nome do produto"
                type="text"
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
                required
              />
            </label>

            <label className="w-full" htmlFor="description">
              <p className="text-[15px] font-[500]">Descrição:</p>
              <textarea
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/90"
                name="description"
                rows={4}
                placeholder="Adicione a descrição da reunião"
                required
              />
            </label>

            <div className="flex items-center justify-between w-full max-xsm:flex-col gap-y-[10px]">
              <label className="flex flex-col w-full">
                <p className="text-[16px]">Categoria</p>
                <Select
                  options={options}
                  required={true}
                  name="category"
                  styles={customStyles}
                />
              </label>
            </div>

            <div className="flex items-center justify-between w-full max-xsm:flex-col gap-y-[10px]">
              <label className="flex flex-col  w-full">
                <p className="text-[16px]">Imagens</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full p-[8px] rounded-[4px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/60"
                  required
                />
              </label>
            </div>

            <div className="mt-[25px] flex w-full justify-end gap-x-[15px]">
              <Dialog.Close asChild>
                <button className="bg-red-500 text-background hover:brightness-95 focus:shadow-green7 inline-flex h-[36px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Cancelar
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
              ref={cancelButtonRef}
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

export default DialogCreateProduct;
