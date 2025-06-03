import React from "react";
import { useCart } from "../../store/cartProduct";
import { FaTrash, FaWhatsapp } from "react-icons/fa";

const ListCart = () => {
  const { cart, updateCart, deleteCart } = useCart();

  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const addWhatsapp = () => {
    const message = encodeURIComponent(
      `Hola, quiero comprar estos productos: ${cart
        .map((product) => `${product.title} - Cantidad: ${product.quantity}`)
        .join("\n")}`
    );

    const url = `https://api.whatsapp.com/send?phone=+593999533414&text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <React.Fragment>
      <ul className="flex flex-col gap-6 ">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div
              className="flex gap-6 rounded-xl py-2 shadow-2xl   justify-around"
              key={product.id}
            >
              <img
                className="size-16 rounded-2xl bg-white shadow-2xl"
                src={product.image}
                alt={product.title}
              />
              <div className="flex flex-col text-sm text-gray-400">
                <h5 className="text-ellipsis overflow-hidden whitespace-nowrap  max-w-40">
                  {product.title}
                </h5>
                <p>${product.price}</p>
              </div>

              <div className="flex flex-col gap-4 justify-center items-center">
                <div>
                  <FaTrash
                    onClick={() => deleteCart(product.id)}
                    className=" cursor-pointer"
                    color="red"
                    size={20}
                  />
                </div>

                <div className="flex gap-4">
                  {product.quantity > 1 && (
                    <button
                      onClick={() =>
                        updateCart(product.id, product.quantity - 1)
                      }
                      className="bg-blue-500 px-2 rounded-2xl text-gray-400 text-lg cursor-pointer"
                    >
                      -
                    </button>
                  )}
                  <p className="text-gray-400 text-lg">{product.quantity}</p>

                  <button
                    onClick={() => updateCart(product.id, product.quantity + 1)}
                    className="bg-blue-500 px-2 rounded-2xl text-gray-400 text-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No hay productos en el carrito</p>
        )}

        {cart.length > 0 && (
          <div className="w-full">
            <h3 className="text-gray-400">Total: ${total.toFixed(2)}</h3>
            <button
              onClick={addWhatsapp}
              className="flex w-full justify-center items-center gap-4 text-xl text-white  bg-green-500  px-6 rounded-2xl py-2 cursor-pointer"
            >
              Pedir por Whatsapp
              <FaWhatsapp size={20} />
            </button>
          </div>
        )}
      </ul>
    </React.Fragment>
  );
};

export default ListCart;
