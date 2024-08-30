import { axiosInstance } from "../libs/axios";
import { ProductDTO, ProductModel } from "../models/product";
import { AxiosResponse } from 'axios';

async function getProductsByCategory(categoryId: number): Promise<AxiosResponse<ProductModel[]>> {
  return await axiosInstance.get<ProductModel[]>(`/products/?categoryId=${categoryId}`);
}

async function uploadProduct(product: ProductDTO) {
  return await axiosInstance.post("/products", product);
}


const productService = {
  getProductsByCategory,
  uploadProduct
};

export default productService;
