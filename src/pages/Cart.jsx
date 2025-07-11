import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../store/cartSlice";

export default function Cart() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart,
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t("cart.title")}</h1>

      {totalQuantity === 0 ? (
        <p>{t("cart.empty")}</p>
      ) : (
        <div>
          <ul className="mb-4">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  {t("cart.remove")}
                </button>
              </li>
            ))}
          </ul>

          <p className="mb-2">
            {t("cart.totalItems")}: {totalQuantity}
          </p>
          <p className="mb-2">
            {t("cart.totalAmount")}: ${totalAmount}
          </p>

          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => dispatch(clearCart())}
          >
            {t("cart.clearCart")}
          </button>
        </div>
      )}
    </div>
  );
}
