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

export default function SwiperCarousel({ products, addProduct }) {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const { cart } = useCart();

  useEffect(() => {
    import("flowbite").then(({ initFlowbite }) => initFlowbite());
  }, []);

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
            <div className="bg-white  py-3 shadow-2xl rounded-2xl hover:scale-110 transition-transform ">
              <img
                src={product.image}
                alt={product.title}
                className="size-40 object-contain"
              />
              <h3 className="mt-2 text-center">{product.title}</h3>

              <div className="flex justify-center">
                {/* <button
                  onClick={() => addProduct(product)}
                  className="bg-green-500 cursor-pointer text-white px-6 rounded-2xl py-2 text-center"
                >
                  Agregar
                </button> */}

                <button
                  onClick={() => {
                    setProduct(product);
                    setQuantity(1);
                  }}
                  data-modal-target="react-modal"
                  data-modal-toggle="react-modal"
                  className="bg-blue-500 text-white px-4 py-2 rounded-2xl cursor-pointer"
                >
                  Agregar
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        id="react-modal"
        aria-hidden="true"
        tabIndex="-1"
        className="hidden fixed inset-0 z-50 overflow-y-auto "
      >
        <div className="relative p-4 w-full max-w-3xl mx-auto my-8 transition-transform">
          <div className="bg-white flex flex-col justify-between rounded-lg shadow p-6  ">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold mb-4 line-clamp-2 w-full ">
                {product?.title}
              </h3>

              <button
                data-modal-hide="react-modal"
                className="bg-red-600 px-4 w-12 h-10 rounded-xl cursor-pointer text-white"
              >
                X
              </button>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-48 object-contain justify-center items-center place-content-center rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <p>{product?.description}</p>
                <p>${product?.price}</p>
              </div>
            </div>

            <div className="flex justify-between ">
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
                // data-modal-hide="react-modal"
                onClick={() => {
                  handleAddToCart(product);
                }}
                className="bg-green-500 cursor-pointer text-white px-6 rounded-2xl py-2 text-center"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
