import { Dispatch, SetStateAction, createContext } from "react";
import { CategoryContextModel } from "../models/category";

export const CategoriesContext = createContext<{
  categories: CategoryContextModel[]| undefined;
  setCategories: Dispatch<SetStateAction<CategoryContextModel[]| undefined>>;
}>(null!);
