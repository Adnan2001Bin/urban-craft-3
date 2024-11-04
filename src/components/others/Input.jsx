import React from 'react';


const Input = React.forwardRef((props ,ref) => {
  return (
    <div >
      <label className='mr-2' htmlFor={props.input.id}>{props.label}</label>
      <input className='pl-2 rounded-sm bg-slate-100 w-10 mr-5 outline outline-1 outline-offset-2' ref={ref} {...props.input} />
    </div>
  );
});

export default Input;