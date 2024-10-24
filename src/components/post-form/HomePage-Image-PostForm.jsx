import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    const images = data.images; // Assuming `images` is an array of images being uploaded

    const uploadFiles = async (files) => {
      return Promise.all(
        files.map((file) => (file ? appwriteService.uploadFile(file) : null))
      );
    };

    const [image1, image2, image3] = await uploadFiles([
      images[0],
      images[1],
      images[2],
    ]);

    if (post) {
      if (image1 || image2 || image3) {
        // Delete old files if new ones are uploaded
        appwriteService.deleteFile(post.homePageImg1);
        appwriteService.deleteFile(post.homePageImg2);
        appwriteService.deleteFile(post.homePageImg3);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        homePageImg1: image1 ? image1.$id : undefined,
        homePageImg2: image2 ? image2.$id : undefined,
        homePageImg3: image3 ? image3.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const [image1, image2, image3] = await uploadFiles([
        data.images[0],
        data.images[1],
        data.images[2],
      ]);

      if (image1 || image2 || image3) {
        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage1: image1?.$id,
          featuredImage2: image2?.$id,
          featuredImage3: image3?.$id,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

}