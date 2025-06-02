import { create } from "zustand";

export const useCart = create((set) => ({
  cart: [],
  loading: false,
  error: null,

  addToCart: (product: any) =>
    set((state: any) => ({ cart: [...state.cart, product] })),

  updateCart: (id: any, quantity: any) =>
    set((state: any) => ({
      cart: state.cart.map((product: any) => {
        console.log("QQQ", quantity);
        return product.id === id ? { ...product, quantity } : product;
      }),
    })),

  deleteCart: (id: any) =>
    set((state: any) => ({
      cart: state.cart.filter((product: any) => product.id !== id),
    })),
}));
