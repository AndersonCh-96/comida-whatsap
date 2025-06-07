import React, { useEffect, useRef, useState } from "react";
import { useProduct } from "../../store/productos";
import SwiperCarousel from "./Swiper";
import { useCart } from "../../store/cartProduct";

import "flowbite";

const ProductList = () => {
  const { products, loading, error, getProducts } = useProduct();

  const { addToCart } = useCart();
  const bebidaRef = useRef(null);
  const comboRef = useRef(null);
  const individualRef = useRef(null);

  useEffect(() => {
    getProducts();
  }, []);

  const scrollToBebida = () => {
    bebidaRef.current?.scrollIntoView({
      behavior: "smooth", // Desplazamiento animado
    });
  };

  const scrollToCombo = () => {
    comboRef.current?.scrollIntoView({
      behavior: "smooth", // Desplazamiento animado
    });
  };

  const scrollToIndividual = () => {
    individualRef.current?.scrollIntoView({
      behavior: "smooth", // Desplazamiento animado
    });
  };

  const addProduct = (product) => {
    addToCart(product);
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <React.Fragment>
      <div className="">
        <div className="flex flex-col sticky top-20 z-99 justify-center w-full gap-2 py-3 bg-gray-100 shadow-md">
          <button className="text-center text-sm md:text-lg font-bold text-black px-6 rounded-2xl  cursor-pointer">
            MENÚ
          </button>

          <div className="flex justify-evenly">
            <button
              onClick={() => {
                scrollToCombo();
              }}
              className="px-6 text-sm md:text-lg bg-amber-400 hover:bg-amber-600 cursor-pointer py-2 font-bold text-white rounded-2xl"
            >
              COMBOS
            </button>
            <button
              onClick={() => {
                scrollToIndividual();
              }}
              className="px-6 text-sm md:text-lg bg-amber-400 hover:bg-amber-600 cursor-pointer   py-2 font-bold text-white rounded-2xl"
            >
              INDIVIDUAL
            </button>
            <button
              onClick={() => {
                scrollToBebida();
              }}
              className="px-6 text-sm md:text-lg bg-amber-400 hover:bg-amber-600 cursor-pointer   py-2 font-bold text-white rounded-2xl"
            >
              BEBIDA
            </button>
          </div>
        </div>

        <div className="max-w-[1500px] w-full  mx-auto " ref={comboRef}>
          <SwiperCarousel addProduct={addProduct} products={products} />
        </div>

        <div className="max-w-[1500px] w-full  mx-auto " ref={individualRef}>
          <div className="bg-amber-400 text-white text-2xl font-bold py-2 px-4">
            {" "}
            <h1>COMBOS</h1>
          </div>

          <div>
            <SwiperCarousel
              addProduct={addProduct}
              products={products.filter((item) => item.category == "combo")}
            />
          </div>
        </div>

        <div className="max-w-[1500px] w-full  mx-auto">
          <div className="bg-amber-400 text-white text-2xl font-bold py-2 px-4">
            {" "}
            <h1>INDIVIDUAL</h1>
          </div>
          <div>
            <SwiperCarousel
              addProduct={addProduct}
              products={products.filter(
                (item) => item.category == "individual"
              )}
            />
          </div>
        </div>

        <div className="max-w-[1500px] w-full  mx-auto">
          <div className="bg-amber-400 text-white text-2xl font-bold py-2 px-4">
            {" "}
            <h1>BEBIDAS</h1>
          </div>

          <div ref={bebidaRef}>
            <SwiperCarousel
              addProduct={addProduct}
              products={products.filter((item) => item.category == "bebida")}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
