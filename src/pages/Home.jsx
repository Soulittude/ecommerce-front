import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

export default function Home() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
                className="bg-blue-500 px-3 py-1 text-white rounded hover:bg-blue-700"
                onClick={() => dispatch(addItem(prod))}
              >
                {t("product_c.addToCart")}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
