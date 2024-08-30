import axios from "axios";
import { axiosInstance } from "../libs/axios";

async function uploadFile(files: File[]): Promise<String[]> {
  const urls = [];
  for (let file of files) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/files/upload", formData);
    urls.push(response.data.location);
  }
  return urls;
}

const fileService = {
  uploadFile,
};

export default fileService;
