import React from "react";

function HeaderCartButton(props) {
  return (
    <button onClick={props.onClick} className="flex">
      <img
        className="w-10 h-10"
        src="public\icons8-cart-100.png"
        alt=""
      />
      <div className=" cartNumber flex justify-center items-center bg-black text-white w-6 h-6 rounded-full">
        0
      </div>
    </button>
  );
}

export default HeaderCartButton;
