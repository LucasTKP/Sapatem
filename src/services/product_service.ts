import { axiosInstance } from "../libs/axios";
import { ProductModel } from "../models/product";
import { AxiosResponse } from 'axios';

async function getProductsByCategory(categoryId: number): Promise<AxiosResponse<ProductModel[]>> {
  return await axiosInstance.get<ProductModel[]>(`/products/?categoryId=${categoryId}`);
}

const productService = {
  getProductsByCategory,
};

export default productService;
