import { ProductDTO, ProductModel } from "@/src/models/product";
import { FormEvent } from "react";
import fileService from "../services/file_service";
import productService from "../services/product_service";
import { toast } from "react-toastify";

interface OnCreateProduct {
  e: FormEvent<HTMLFormElement>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onGetProducts: () => void;
  onCloseDialog: () => void;
}

async function onCreateProduct({ e, setIsLoading, onGetProducts, onCloseDialog }: OnCreateProduct) {
  e.preventDefault();
  setIsLoading(true);
  const form = e.currentTarget;
  try {
    const images = formatFiles(form);
    const urls = await fileService.uploadFile(images);
    let dataProduct = await formatterDataUser(form, urls);
    if (verifyDataUser(dataProduct)) {
      await productService.uploadProduct(dataProduct);
      toast.success("Produto criado com sucesso.");
      onGetProducts();
      onCloseDialog();
    }
  } catch (error) {
    console.log(error);
    toast.error("Erro ao cadastrar o produto.");
  } finally {
    setIsLoading(false);
  }
}

async function formatterDataUser(
  form: HTMLFormElement,
  urls: String[]
): Promise<ProductDTO> {
  const formData = new FormData(form);
  const dataProduct: ProductDTO = {
    title: formData.get("title") as string,
    price: parseFloat(formData.get("price") as string),
    description: formData.get("description") as string,
    images: urls,
    categoryId: formData.get("category") as string,
  };

  return dataProduct;
}

function verifyDataUser(dataUser: ProductDTO): boolean {
  if (
    dataUser.title &&
    dataUser.price &&
    dataUser.description &&
    dataUser.images.length > 0 &&
    dataUser.categoryId
  ) {
    return true;
  }
  // toast.error("Dados insuficientes");
  return false;
}

function formatFiles(form: HTMLFormElement): File[] {
  const input = form.querySelector('input[type="file"]') as HTMLInputElement;
  const files = input?.files;
  const validImages: File[] = [];

  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        validImages.push(file);
      } else {
        alert("Apenas arquivos de imagem são permitidos!");
        input.value = "";
        break;
      }
    }
  }

  return validImages;
}

const dialogCreateController = {
  onCreateProduct,
};

export default dialogCreateController;
