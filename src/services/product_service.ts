import { axiosInstance } from "../libs/axios";
import { ProductDTO, ProductModel } from "../models/product";
import { AxiosResponse } from "axios";

async function getProductsByCategory(
  categoryId: number
): Promise<AxiosResponse<ProductModel[]>> {
  return await axiosInstance.get<ProductModel[]>(
    `/products/?categoryId=${categoryId}`
  );
}

async function uploadProduct(product: ProductDTO) {
  return await axiosInstance.post("/products", product);
}

async function updateProduct(product: ProductDTO, idProduct: number) {
  return await axiosInstance.put(`/products/${idProduct}`, product);
}

async function deleteProduct(idProduct: number) {
  return await axiosInstance.delete(`/products/${idProduct}`);
}

const productService = {
  getProductsByCategory,
  uploadProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
