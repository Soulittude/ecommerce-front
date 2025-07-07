import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="bg-purple-200 shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        {t("nav.mystore")}
      </Link>

      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-blue-600">
            {t("nav.home")}
          </Link>
        </li>
        <li>
          <Link to="/cart" className="relative hover:text-blue-600">
            {t("nav.cart")}
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
