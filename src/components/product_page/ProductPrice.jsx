import React from "react";

const ProductPrice = ({ price, salePrice }) => {
  return (
    <div className="text-2xl font-bold">
      {salePrice ? (
        <div className="flex items-baseline gap-2">
          <span className="text-red-600">${salePrice.toFixed(2)}</span>
          <span className="text-base text-gray-500 line-through">
            ${price.toFixed(2)}
          </span>
        </div>
      ) : (
        <span>${price.toFixed(2)}</span>
      )}
    </div>
  );
};

export default ProductPrice;
