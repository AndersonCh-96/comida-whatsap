import React, { useEffect, useState } from "react";
import { useProduct } from "../../store/productos";
import SwiperCarousel from "./Swiper";
import { useCart } from "../../store/cartProduct";

import "flowbite";

const ProductList = () => {
  const { products, loading, error, getProducts } = useProduct();

  const { addToCart } = useCart();

  console.log("Product", products);

  useEffect(() => {
    getProducts();
  }, []);

  const addProduct = (product) => {
    addToCart(product);
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <React.Fragment>
      <div className=" max-w-[1500px] mx-auto ">
        <div className="flex justify-center w-full gap-5 py-6 bg-gray-200 shadow-md mt-4">
          <button className="text-center text-lg font-bold text-black px-6 rounded-2xl py-2 cursor-pointer">
            TODAS LAS ENTRADAS
          </button>
        </div>

        <div className="w-full  mx-auto">
          <SwiperCarousel addProduct={addProduct} products={products} />
        </div>

        <div className="flex justify-center w-full gap-5 py-6 bg-gray-200 shadow-md mt-4">
          <button className="text-center text-lg font-bold text-black px-6 rounded-2xl py-2 cursor-pointer">
            HOMBRES
          </button>
        </div>

        <div>
          <SwiperCarousel
            addProduct={addProduct}
            products={products.filter(
              (product) => product.categoria === "hombre"
            )}
          />
        </div>

        <div className="flex justify-center w-full gap-5 py-6 bg-gray-200 shadow-md mt-4">
          <button className="text-center text-lg font-bold text-black px-6 rounded-2xl py-2 cursor-pointer">
            MUJERES
          </button>
        </div>

        <div>
          <SwiperCarousel
            addProduct={addProduct}
            products={products.filter(
              (product) => product.categoria === "mujer"
            )}
          />
        </div>

        <div className="flex justify-center w-full gap-5 py-6 bg-gray-200 shadow-md mt-4">
          <button className="text-center text-lg font-bold text-black px-6 rounded-2xl py-2 cursor-pointer">
            NIÑO
          </button>
        </div>

        <div>
          <SwiperCarousel
            addProduct={addProduct}
            products={products.filter(
              (product) => product.categoria === "niño"
            )}
          />
        </div>

        <div className="flex justify-center w-full gap-5 py-6 bg-gray-200 shadow-md mt-4">
          <button className="text-center text-lg font-bold text-black px-6 rounded-2xl py-2 cursor-pointer">
            NIÑA
          </button>
        </div>

        <div>
          <SwiperCarousel
            addProduct={addProduct}
            products={products.filter(
              (product) => product.categoria === "niña"
            )}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
