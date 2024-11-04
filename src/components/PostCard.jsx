import React from "react";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";

import { Link } from "react-router-dom";

function PostCard({ $id, homePageImg1, homePageImg2, homePageImg3 }) {
  return (
    <Link to={`/HomepageimgPost/${$id}`}>
      <div className="bg-[#f5f5d6] p-4 rounded-lg shadow-md w-80 ">
        <div className="bg-white rounded-lg overflow-hidden">
          <img
            src={appwriteService.getFilePreview(homePageImg1)}
            alt="homePageImg1"
            className="w-full h-48 object-cover"
          />

          <img
            src={appwriteService.getFilePreview(homePageImg2)}
            alt="homePageImg1"
            className="w-full h-48 object-cover"
          />

          <img
            src={appwriteService.getFilePreview(homePageImg3)}
            alt="homePageImg1"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
