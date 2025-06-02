import React, { useEffect } from "react";
import { useProduct } from "../../store/productos";
import SwiperCarousel from "./Swiper";
import { useCart } from "../../store/cartProduct";

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
        <h1>Lista de Productos</h1>

        <div className="flex w-full gap-5">
          <button className="bg-black/20 text-black px-6 rounded-2xl py-2 cursor-pointer">
            Todos
          </button>
          <button>Hombre</button>
          <button>Mujer</button>
        </div>

        <div className="w-full  mx-auto">
          <SwiperCarousel addProduct={addProduct} products={products} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
