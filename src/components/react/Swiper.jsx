import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";

("use client");

import { useCart } from "../../store/cartProduct";
import toast from "react-hot-toast";
import { FreeMode, Pagination } from "swiper/modules";
import { FaPlus } from "react-icons/fa";

export default function SwiperCarousel({ products, addProduct }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const { cart } = useCart();

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      alert("El producto ya está en el carrito");
      toast.success("¡Producto agregado al carrito!");
      return;
    }

    addProduct({ ...product, quantity });
    setIsModalOpen(false);
  };

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        freeMode={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[FreeMode, Pagination]}
        className="mySwiper w-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="w-full">
            <div className=" min-h-[280px] bg-white shadow-xl  mt-6 rounded-2xl hover:scale-110 transition-transform ">
              <img
                src={product.image}
                alt={product.nome}
                className="size-40 object-contain rounded-4xl"
              />
              <h3 className="mt-2 mb-3 text-center text-sm  text-gray-500">
                {product.name}
              </h3>
              <p className="text-center text-sm text-gray-500 mb-2">
                ${product.price}
              </p>

              <div className="flex justify-center mx-4">
                <button
                  onClick={() => {
                    setProduct(product);
                    setQuantity(1);
                    setIsModalOpen(true);
                  }}
                  data-modal-target="react-modal"
                  data-modal-toggle="react-modal"
                  className="bg-blue-500 w-full text-white px-4 py-2 rounded-2xl cursor-pointer"
                >
                  Agregar
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {isModalOpen && (
        <div
          id="react-modal"
          // aria-hidden="true"
          // tabIndex="-1"
          // className="hidden fixed inset-0 z-90 overflow-y-auto  "
          className=" fixed inset-0 z-90 overflow-y-auto  bg-black/70 flex justify-center"
        >
          <div className="relative p-4 w-full max-w-4xl mx-auto my-8 transition-transform justify-center items-center place-content-center">
            <div className="bg-white flex flex-col justify-between rounded-lg shadow p-6  ">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold mb-4 line-clamp-2 w-full border-b-1 border-gray-400  mx-8">
                  {product?.name}
                </h3>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-600 px-4 w-12 h-10 rounded-xl cursor-pointer text-white"
                >
                  X
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 ">
                <div className="bg-white shadow-2xl rounded-2xl">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full rounded-2xl h-70 hover:scale-110 cursor-pointer object-contain justify-center items-center place-content-center"
                  />
                </div>
                <div className="flex flex-col justify-between pl-4">
                  <p className="text-sm mt-4 md:mt-0 lg:text-md text-gray-600  ">
                    {product?.description}
                  </p>
                  <p className="bg-amber-400 w-20 rounded-2xl px-2 py-1 text-white font-bold text-center">
                    ${product?.price}
                  </p>

                  <div className="flex justify-end gap-5 mt-6 ">
                    <div className="flex gap-6 justify-center items-center">
                      <button
                        onClick={decrementQuantity}
                        className="bg-blue-700 text-white  text-lg px-4 py-1 rounded cursor-pointer"
                      >
                        -
                      </button>
                      <p>{quantity}</p>
                      <button
                        onClick={incrementQuantity}
                        className="bg-blue-700 text-white text-lg  px-4 py-1 rounded cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <button
                      data-modal-hide="react-modal"
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                      className="bg-green-500 flex items-center gap-2 cursor-pointer text-white px-2 md:px-6 rounded-2xl py-2 text-center"
                    >
                      Añadir al carrito
                      <FaPlus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
