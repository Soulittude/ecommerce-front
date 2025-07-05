import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart } from "../store/cartSlice";

export default function Home() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart,
  );

  // Example product list
  const products = [
    { id: "apple", name: "Apple", price: 1 },
    { id: "banana", name: "Banana", price: 2 },
    { id: "peach", name: "Peach", price: 3 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t("welcome")}</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {products.map((prod) => (
            <div key={prod.id} className="border p-4 rounded">
              <h3 className="font-medium mb-1">{prod.name}</h3>
              <p className="mb-2">
                {t("product.price", { price: prod.price })}
              </p>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => dispatch(addItem(prod))}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">{t("cart.title")}</h2>
        {totalQuantity === 0 ? (
          <p>{t("cart.empty")}</p>
        ) : (
          <>
            <ul className="mb-2">
              {items.map((item) => (
                <li key={item.id} className="mb-1">
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
            <p>Total Items: {totalQuantity}</p>
            <p>Total Amount: ${totalAmount}</p>
            <button
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </>
        )}
      </section>
    </div>
  );
}
