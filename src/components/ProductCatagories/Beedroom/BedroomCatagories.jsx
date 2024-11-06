import React from 'react'
import './BedroomCatagories.css'
import { Link } from 'react-router-dom'

const BedroomCatagories = () => {
  return (
    <div className='bedCatagories flex items-center shadow-xl mt-7 bg-white'>
      <div className='bg-orange-50 w-3/5 h-full rounded-xl flex-col items-start'>
        <img className='w-full h-3/5 rounded-lg' src="BedRoom\BedRoomCatagories\pexels-photo-279746 (1).jpeg" alt="" />
        <h1 className='font-bold text-lg text-black text-center mt-1'>BEDROOM INTERIOR IDEAS</h1>
        <p className='text-xs text-center mt-1'>Discover inspiring bedroom interior ideas to transform your space into a cozy retreat. From minimalist designs to bold color schemes, find your perfect style.</p>
        {/* to={'/BedRoomCatagoriesPage'} */}
        <Link to={'/BedRoomCatagoriesPage'}>
          <button className='bg-black w-24 mt-2 ml-20 hover:bg-gray-700 rounded-3xl h-7 text-white text-sm '>Show All</button>
        </Link>


      </div>
      <div className='grid grid-cols-2 gap-2 w-full h-full items-center'>
      
        <Link  to={'/Product'} className='shadow-md h-full bedItems cursor-pointer'>
          <img className='w-24 h-24 mb-2' src="BedRoom\BedRoomCatagories\DSC_4815.jpg" alt="" />
          <h1 className='text-xl font-bold'>BED</h1>
        </Link>




        <Link to={'/BedSideTable'} className='shadow-md h-full bedItems cursor-pointer'>
          <img className='w-24 h-24 mb-2' src="BedRoom\BedRoomCatagories\Cosmos-110 .png" alt="" />
          <h1 className='text-xl font-bold'>BED SIDE TABLE</h1>
        </Link>


        <Link to={'/DressingTable'} className='shadow-md h-full bedItems cursor-pointer'>
          <img className='w-24 h-24 mb-2' src="BedRoom\BedRoomCatagories\Chic-145.png" alt="" />
          <h1 className='text-xl font-bold'>DRESSING TABLE</h1>
        </Link>


        <Link to={'/Wardrobe'} className='shadow-md h-full bedItems cursor-pointer'>
          <img className='w-24 h-24 mb-2 ' src="BedRoom\BedRoomCatagories\Bradshaw-141 .png" alt="" />
          <div className='text-xl font-bold'>
            <h1>WARDROBE</h1>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default BedroomCatagories

