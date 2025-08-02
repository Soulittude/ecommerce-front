import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useSeoData } from "../hooks/useSeoData";
import Seo from "@/components/Seo.jsx";
import {
  removeItem,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from "../store/cartSlice";
import { checkout } from "../store/orderSlice";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const seoData = useSeoData("cart");
  const { items, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart,
  );
  const { status } = useSelector((s) => s.order);
  const token = useSelector((state) => state.auth.token);

  const handleCheckout = async () => {
    if (!token) {
      alert("Please log in to proceed with checkout.");
      return;
    }
    try {
      const orderData = { items };
      await dispatch(checkout(orderData)).unwrap();
      navigate("/order-confirmation");
    } catch (error) {
      if (error.message.includes("401")) {
        alert("Your session has expired. Please log in again.");
      } else {
        alert("An error occurred during checkout. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 md:p-6 pb-16 md:pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {t("cart.title")}
        </h1>

        {totalQuantity === 0 ? (
          <Card className="flex flex-col items-center justify-center min-h-[300px] gap-4 animate-fade-in p-6">
            <CardHeader className="p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-xl text-gray-500">{t("cart.empty")}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className="flex justify-between items-start p-4"
                >
                  <CardHeader className="p-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h3>
                  </CardHeader>
                  <CardContent className="p-0 flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 rounded-full"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 rounded-full"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      +
                    </Button>
                  </CardContent>
                  <CardFooter className="p-0 flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => dispatch(removeItem(item.id))}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-100 shadow-lg p-4 space-y-4">
              <div className="flex justify-between text-lg">
                <span className="font-medium text-gray-700">
                  {t("cart.totalItems")}:
                </span>
                <span className="font-semibold text-gray-900">
                  {totalQuantity}
                </span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-medium text-gray-700">
                  {t("cart.totalAmount")}:
                </span>
                <span className="font-bold text-gray-900">{totalAmount} ₺</span>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  variant="destructive"
                  className="flex-1 px-6 py-3"
                  onClick={() => dispatch(clearCart())}
                >
                  {t("cart.clearCart")}
                </Button>
                <Button
                  onClick={handleCheckout}
                  disabled={status === "loading"}
                  variant="default"
                  className="flex-1 px-6 py-3"
                >
                  {status === "loading"
                    ? t("cart.loading")
                    : t("cart.checkout")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Seo title={seoData.title} description={seoData.description} />
    </>
  );
}
