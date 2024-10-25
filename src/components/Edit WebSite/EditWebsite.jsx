import React from "react";
import { Link } from "react-router-dom";
import "./EditWebsite.css";

const EditWebsite = () => {
  return (
    <div className="bg-blue-gray-50 flex items-start shadow-xl mt-4  Catagories p-2 gap-5">
      <div className="w-1/2 h-full rounded-lg flex-col items-start justify-start">
        <img
          className="w-full h-6/12 rounded-lg"
          src="https://th.bing.com/th/id/OIG3.5_I59iWETVRRxCrmLwyw?pid=ImgGn"
          alt=""
        />
        <h1 className='font-bold text-xl text-black text-center mt-2'>Edit Website</h1>
      </div>
      <div className="w-1/2 bg-white h-full rounded-xl">
        <Link to={"/All HomePage Img"}>
          <div className="rounded-xl flex items-center font-MyFont1 font-bold gap-3 hover:border-2 hover:border-gray-400 mb-2" >
            <img
              className="w-10 "
              src="https://cdn-icons-png.flaticon.com/128/15436/15436780.png"
              alt=""
            />
            <p>Home Page Image</p>
          </div>
        </Link>

        <Link to={"/AddHomePageImg"}>
          <div className="rounded-xl flex items-center font-MyFont1 font-bold gap-3 hover:border-2 hover:border-gray-400">
            <img
              className="w-10 "
              src="https://cdn-icons-png.flaticon.com/128/10054/10054290.png"
              alt=""
            />
            <p>Add HomePage Image</p>
          </div>
        </Link>
        
      </div>
    </div>
  );
};

export default EditWebsite;
