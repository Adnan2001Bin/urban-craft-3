import React from 'react'

const ProductCardLayout = (props) => {
  return (
    <div className='grid lg:grid-cols-3 grid-cols-2 gap-y-5 pl-4 '>
      {props.children}
    </div>
  )
}

export default ProductCardLayout
