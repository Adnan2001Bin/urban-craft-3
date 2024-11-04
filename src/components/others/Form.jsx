import React, { useRef, useState } from 'react';
import Input from './Input';
import './Form.css';

function Form(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className="lg:flex lg:items-center lg:justify-between lg:space-x-2 sm:pl-7 pl-2" onSubmit={submitHandler}>
      <div className="flex lg:w-56 lg:h-8 items-center justify-center lg:space-x-2 bg-slate-200 sm:w-52 w-36">
        <button
          type="button"
          className="bg-gray-300 text-black rounded-l px-3 py-1"
          onClick={() => {
            if (amountInputRef.current.value > 1) {
              amountInputRef.current.value--;
            }
          }}
        >
          -
        </button>
        <Input
          ref={amountInputRef}
          label="Quantity:"
          input={{
            id: 'amount',
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1',
            className: 'w-16 text-center',
          }}
        />
        <button
          type="button"
          className="bg-gray-300 text-black rounded-r px-3 py-1"
          onClick={() => {
            if (amountInputRef.current.value < 5) {
              amountInputRef.current.value++;
            }
          }}
        >
          +
        </button>
      </div>
      <button className="bg-black text-sm w-28 hover:bg-gray-700 rounded-3xl h-8 text-white sm:ml-11 ml-4 sm:mt-5 mt-3">+ Add To Cart</button>
      {!amountIsValid && <p className="bg-red-500 text-white p-1 rounded">Please enter a valid amount (1-5).</p>}
    </form>
  );
}

export default Form;
