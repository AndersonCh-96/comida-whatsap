import React from "react";
import { useCart } from "../../store/cartProduct";

const CartCount = () => {
  const { cart } = useCart();

  return (
    <React.Fragment>
      <div>
        <img
          src="https://img.icons8.com/ios-glyphs/30/000000/shopping-cart--v1.png"
          alt=""
        />
        <div className="gap-14 absolute flex flex-col  items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500  border-white rounded-full -top-2 -end-2 dark:border-gray-900">
          {cart.length}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartCount;
