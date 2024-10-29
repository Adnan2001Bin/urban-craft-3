import React, { useState, useEffect } from "react";
import { PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [post, setPost] = useState(null); // Change to store a single post

  useEffect(() => {
    appwriteService.getPosts([]).then((response) => {
      if (response && response.documents.length > 0) {
        setPost(response.documents[0]); // Set only the first post
      }
    });
  }, []);

  if (!post) {
    return (
      <div className="w-full h-96 flex justify-center items-center font-fontFooter1 text-black text-5xl">
        <h1>Posts is empty</h1>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-20 bg-red-600">
      <div className="w-full flex justify-center font-fontFooter font-bold text-5xl">
        <h1>Home Page Image</h1>
      </div>
      <div className="flex bg-blue-gray-500 justify-center p-2 w-full">
        <PostCard {...post} />
      </div>
    </div>
  );
}

export default AllPosts;
