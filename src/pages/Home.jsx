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
    { id: "apple", name: t("product.apple"), price: 1 },
    { id: "banana", name: t("product.banana"), price: 2 },
    { id: "peach", name: t("product.peach"), price: 3 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t("welcome")}</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("product_c.title")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {products.map((prod) => (
            <div key={prod.id} className="border p-4 rounded">
              <h3 className="font-medium mb-2">{prod.name}</h3>
              <p className="mb-1">
                {t("product_c.price", { price: prod.price })}
              </p>
              <button
                className="bg-blue-500 px-3 py-1 text-white rounded"
                onClick={() => dispatch(addItem(prod))}
              >
                {t("product_c.addToCart")}
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-2">{t("cart.title")}</h2>
        {totalQuantity === 0 ? (
          <p>{t("cart.empty")}</p>
        ) : (
          <>
            <ul>
              {items.map((item) => (
                <li key={item.id} className="mb-1">
                  {item.name} x {item.price}
                </li>
              ))}
            </ul>
            <p>
              {t("cart.totalItems")}: {totalQuantity}
            </p>
            <p>
              {t("cart.totalAmount")}: {totalAmount}
            </p>
            <button
              className="bg-red-400 px-3 py-1 text-white rounded"
              onClick={() => dispatch(clearCart())}
            >
              {t("cart.clearCart")}
            </button>
          </>
        )}
      </section>
    </div>
  );
}
