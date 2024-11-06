import React, { useState, useEffect } from "react";
import { ProductCard } from "../../../components";
import appwriteService from "../../../appwrite/config";

const Bed = () => {
  const [beds, setBeds] = useState([]); // Initialize with an empty array

  useEffect(() => {}, []);
  appwriteService.getProducts([]).then((beds) => {
    if (beds) {
      setBeds(beds.documents);
    }
  });

  // useEffect(() => {
  //   appwriteService.getPosts().then((posts) => {
  //     if (posts) {
  //       setBeds(posts.documents); // Update beds with the fetched data
  //     }
  //   });
  // }, []);

  if (beds.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center font-fontFooter1 text-black text-5xl">
        <h1>Bed is empty</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="w-full flex justify-end items-center mt-5 mb-5">
        <div className="flex w-2/4 justify-between pr-5 items-center">
          <div>
            <h1 className="text-3xl font-semibold">Beds</h1>
            <p className="font-extrabold text-gray-900 bg-zinc-950 w-14 h-1"></p>
          </div>
          <p className="hidden md:block md:text-lg">
            Showing {beds.length} Products
          </p>
        </div>
      </div>
      <div>
        {beds.map((bed) => (
          <div key={bed.$id}>
            <ProductCard {...bed} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bed;
