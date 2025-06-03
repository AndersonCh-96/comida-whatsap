import axios from "axios";
import { create } from "zustand";
import shoes from "../data/shoes.json";

export const useProduct = create((set) => ({
  products: [],
  loading: false,
  error: null,
  getProducts: async () => {
    set({ loading: true, error: null });

    set({ products: shoes, loading: false });

    // try {
    //   const res = await axios
    //     .get("https://fakestoreapi.com/products")
    //     .then((res) => res.data);
    //   set({ products: res, loading: false });
    // } catch (error: any) {
    //   set({ error: error.message, loading: false });
    // }
  },
}));
