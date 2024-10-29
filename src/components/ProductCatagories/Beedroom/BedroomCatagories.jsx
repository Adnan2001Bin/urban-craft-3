import React from 'react'
import './BedroomCatagories.css'
import { Link } from 'react-router-dom'

const BedroomCatagories = () => {
  return (
    <div className='bedCatagories flex items-center shadow-xl mt-7 bg-white'>
      <div className='bg-orange-50 w-3/5 h-full rounded-xl flex-col items-start'>
        <img className='w-full h-3/5 rounded-lg' src="https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <h1 className='font-bold text-lg text-black text-center mt-1'>BEDROOM INTERIOR IDEAS</h1>
        <p className='text-xs text-center mt-1'>Discover inspiring bedroom interior ideas to transform your space into a cozy retreat. From minimalist designs to bold color schemes, find your perfect style.</p>
        {/* to={'/BedRoomCatagoriesPage'} */}
        <Link to={'/BedRoomCatagoriesPage'}>
          <button className='bg-black w-24 mt-2 ml-20 hover:bg-gray-700 rounded-3xl h-7 text-white text-sm '>Show All</button>
        </Link>


      </div>
      <div className='grid grid-cols-2 gap-2 w-full h-full items-center'>
      
        <Link  to={'/Bed'} className='shadow-md h-full bedItems cursor-pointer'>
          <img className='w-24 h-24 mb-2' src="https://hatil-image.s3.ap-southeast-1.amazonaws.com/Nop_Image/DSC_4815.jpg" alt="" />
          <h1 className='text-xl font-bold'>BED</h1>
        </Link>




        <Link to={'/BedSideTable'} className='shadow-md h-full bedItems cursor-pointer'>
          <img className='w-24 h-24 mb-2' src="https://hatil-image.s3.ap-southeast-1.amazonaws.com/master_image/Cosmos-110%20.png" alt="" />
          <h1 className='text-xl font-bold'>BED SIDE TABLE</h1>
        </Link>


        <Link to={'/DressingTable'} className='shadow-md h-full bedItems cursor-pointer'>
          <img className='w-24 h-24 mb-2' src="https://hatil-image.s3.ap-southeast-1.amazonaws.com/master_image/Chic-145.png" alt="" />
          <h1 className='text-xl font-bold'>DRESSING TABLE</h1>
        </Link>


        <Link to={'/Wardrobe'} className='shadow-md h-full bedItems cursor-pointer'>
          <img className='w-24 h-24 mb-2 ' src="https://hatil-image.s3.ap-southeast-1.amazonaws.com/master_image/Bradshaw-141%20.png" alt="" />
          <div className='text-xl font-bold'>
            <h1>WARDROBE</h1>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default BedroomCatagories

