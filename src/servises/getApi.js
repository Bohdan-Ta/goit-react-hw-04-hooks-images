import axios from "axios";
import { toast } from "react-toastify";

const getDataImages = axios.create({
  baseURL: "https://pixabay.com/api/",
  timeout: 1000,

  params: {
    key: "24045276-2d1f958b632c915d7d2587282",
    per_page: 12,
    image_type: "photo",
    orientation: "horizontal",
  },
});
export async function fetchAPI(q, page) {
  try {
    const { data } = await getDataImages("", { params: { q, page } });
    return data;
  } catch (error) {
    toast.dark(`No image with  ${q}`);
  }
}
