import "./Cart.css";
import ModalCart from "./ModalCart";
import { Link } from "react-router-dom";

function Cart(props) {
  return (
    <ModalCart onClose={props.onClose}>
      <div className="emptyCart">
        <img className="w-4/5" src="assets\Untitled design.png" alt="" />
        <h1 className="text-xl font-bold">Your Cart is feeling lonely</h1>

        <Link to="/">
          <button className="bg-black text-white w-40 h-10 rounded-xl mt-5">
            Start Shopping
          </button>
        </Link>
      </div>
    </ModalCart>
  );
}

export default Cart;
