import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import './ModalCart.css'



const Backdrop = props => {
  return <div onClick={props.onClose} className='fixed z-20 w-full  h-full bg-slate-900 opacity-40'/>
}

const ModalOverlay = props => {
  return <div className='flex justify-end'>
    <div className="modal fixed flex items-center justify-between pl-4 z-30 w-1/4 bg-white">
      <div className='w-full'>
        {props.children}
      </div>
    </div>
  </div>
}

const portalElement = document.getElementById('overlays');


function ModalCart(props) {
  return (<Fragment>
    {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
    {ReactDOM.createPortal(
      <ModalOverlay>{props.children}</ModalOverlay>,
      portalElement
    )}
  </Fragment>
  )
}

export default ModalCart
