import { toast } from "react-toastify";
import { ProductDTO, ProductModel } from "../models/product";
import productService from "../services/product_service";
import { FormEvent } from "react";
import fileService from "../services/file_service";

interface DeleteProductsProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  idProduct: number;
  setProductSelected: React.Dispatch<React.SetStateAction<ProductModel | null>>;
  onGetProducts: () => void;
}

async function deleteProduct({
  setIsLoading,
  idProduct,
  setProductSelected,
  onGetProducts,
}: DeleteProductsProps) {
  try {
    setIsLoading(true);
    const response = await productService.deleteProduct(idProduct);
    toast.success("Produto excluído com sucesso!");
    onGetProducts();
    setProductSelected(null);
  } catch (error) {
  } finally {
    setIsLoading(false);
  }
}

interface RemoveImageProps {
  urlImage: string;
  setProductSelected: React.Dispatch<React.SetStateAction<ProductModel | null>>;
  productSelected: ProductModel | null;
}

async function removeImages({
  urlImage,
  setProductSelected,
  productSelected,
}: RemoveImageProps) {
  if (productSelected) {
    const updatedImages = productSelected.images.filter(
      (image) => image !== urlImage
    );
    setProductSelected({ ...productSelected, images: updatedImages });
  }
}

interface OnEditProduct {
  e: FormEvent<HTMLFormElement>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onGetProducts: () => void;
  productSelected: ProductModel;
  setProductSelected: React.Dispatch<React.SetStateAction<ProductModel | null>>;
}

async function OnEditProduct({
  e,
  setIsLoading,
  onGetProducts,
  productSelected,
  setProductSelected,
}: OnEditProduct) {
  e.preventDefault();
  setIsLoading(true);
  const form = e.currentTarget;
  try {
    const images = formatFiles(form);
    let urls = await fileService.uploadFile(images);
    let dataProduct = await formatterDataProduct(form, urls.concat(productSelected.images));
    if (verifyDataProduct(dataProduct)) {
      await productService.updateProduct(dataProduct, productSelected.id);
      toast.success("Produto atualizado com sucesso.");
      onGetProducts();
      setProductSelected(null);
    }
  } catch (error) {
    console.log(error);
    toast.error("Erro ao atualizar o produto.");
  } finally {
    setIsLoading(false);
  }
}

async function formatterDataProduct(
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

function verifyDataProduct(dataProduct: ProductDTO): boolean {
  console.log(dataProduct);
  if (
    dataProduct.title &&
    dataProduct.price &&
    dataProduct.description &&
    dataProduct.images.length > 0 &&
    dataProduct.categoryId
  ) {
    return true;
  }
  toast.error("Dados insuficientes");
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

const dialogEditController = {
  deleteProduct,
  removeImages,
  OnEditProduct
};

export default dialogEditController;
