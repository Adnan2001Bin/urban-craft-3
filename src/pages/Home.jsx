import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Carousel } from '@material-tailwind/react';

function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch posts and extract image IDs
    appwriteService.getPosts().then((response) => {
      if (response) {
        // Flatten the array to have all images in a single array
        const imageIds = response.documents.flatMap((HomepageimgPost) => [
          HomepageimgPost.homePageImg1,
          HomepageimgPost.homePageImg2,
          HomepageimgPost.homePageImg3
        ]).filter(Boolean); // Remove any undefined or null values
        setImages(imageIds);
      }
    });
  }, []);

  return (
    <Carousel
      className="rounded-xl"
      loop={true}
      autoplay={true} 
      autoplayDelay={5000} 
    >
      {images.map((imageId, index) => (
        <img
          key={index}
          src={appwriteService.getFilePreview(imageId)}
          alt={`Slide ${index + 1}`}
          className="h-screen w-full object-cover"
        />
      ))}
    </Carousel>
  );
}

export default Home;
