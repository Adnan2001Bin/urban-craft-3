import React from "react";
import "./ProductCard.css";
import Form from "./others/Form";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

const ProductCard = ({ $id, productTitle, productPrice, productImg }) => {
  return (
    <Link to={`/Product/${$id}`}>
      <div className=" sm:p-4 bg-red-300 lg:w-11/12 sm:w-72 w-40 h-full  shadow-lg rounded-md overflow-hidden hover:border-2 hover:border-gray-300 ">
        <div className="w-full lg:h-80 h-48 overflow-hidden relative rounded-md ">
          <img
            className="transition-transform duration-700 transform hover:scale-110 w-full h-full object-cover"
            src={appwriteService.getFilePreview(productImg)}
            alt={productTitle}
          />
        </div>
        <div className="sm:mb-5 mb-2">
          <h1 className="text-center sm:text-xl text-base text-slate-700 font-sans font-semibold">
            {productTitle}
          </h1>
          <p className="text-center  mt-1 font-mono font-bold">
            {productPrice}
          </p>
        </div>
        <Form />
      </div>
    </Link>
  );
};

export default ProductCard;
