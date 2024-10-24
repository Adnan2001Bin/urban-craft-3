import React, { useState, useEffect } from "react";
import {  PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  appwriteService.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });

  if (posts.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center font-fontFooter1 text-black text-5xl">
        <h1>Posts is empty</h1>
      </div>
    );
  }
  return (
    <div className="w-full py-8 px-20">
        <div className="w-full flex justify-center font-fontFooter font-bold text-5xl"><h1>Our Menu</h1></div>
        <div className="grid grid-cols-4">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
    </div>
  );
}

export default AllPosts;
