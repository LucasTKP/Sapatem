import { AxiosResponse } from "axios";
import { axiosInstance } from "../libs/axios";
import { CategoryModel } from "../models/category";

async function getAllCategories(): Promise<AxiosResponse<CategoryModel[]>> {
  return await axiosInstance.get("/categories");
}

async function createCategory(name: string) : Promise<AxiosResponse<CategoryModel>> {
  return await axiosInstance.post("/categories", { name:name, image: "https://placeimg.com/640/480/any" });
}

const categoryService = {
  getAllCategories,
  createCategory,
};

export default categoryService;
