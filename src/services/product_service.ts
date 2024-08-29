import { axiosInstance } from "../libs/axios";
import { Product } from "../models/product";
import { AxiosResponse } from 'axios';

async function getProductsByCategory(categoryId: number): Promise<AxiosResponse<Product[]>> {
  return await axiosInstance.get<Product[]>(`/products/?categoryId=${categoryId}`);
}

const productService = {
  getProductsByCategory,
};

export default productService;
