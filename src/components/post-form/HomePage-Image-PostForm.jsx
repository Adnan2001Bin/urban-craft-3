import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ HomepageimgPost }) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: HomepageimgPost?.title || "",
      slug: HomepageimgPost?.$id || "",
      status: HomepageimgPost?.status || "active",
    },
  });

  const [previews, setPreviews] = useState({
    preview1: HomepageimgPost ? appwriteService.getFilePreview(HomepageimgPost.homePageImg1) : null,
    preview2: HomepageimgPost ? appwriteService.getFilePreview(HomepageimgPost.homePageImg2) : null,
    preview3: HomepageimgPost ? appwriteService.getFilePreview(HomepageimgPost.homePageImg3) : null,
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const handlePreview = (files, previewKey) => {
    if (files && files.length > 0) {
      const file = files[0];
      setPreviews((prevState) => ({
        ...prevState,
        [previewKey]: URL.createObjectURL(file),
      }));
    }
  };

  const submit = async (data) => {
    const file1 = data.image1[0]
      ? await appwriteService.uploadFile(data.image1[0])
      : null;
    const file2 = data.image2[0]
      ? await appwriteService.uploadFile(data.image2[0])
      : null;
    const file3 = data.image3[0]
      ? await appwriteService.uploadFile(data.image3[0])
      : null;

    if (HomepageimgPost) {
      const dbPost = await appwriteService.updatePostHomePageImg(HomepageimgPost.$id, {
        ...data,
        homePageImg1: file1 ? file1.$id : HomepageimgPost.homePageImg1,
        homePageImg2: file2 ? file2.$id : HomepageimgPost.homePageImg2,
        homePageImg3: file3 ? file3.$id : HomepageimgPost.homePageImg3,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      if (file1 && file2 && file3) {
        const dbPost = await appwriteService.createHomePageimgPost({
          ...data,
          homePageImg1: file1.$id,
          homePageImg2: file2.$id,
          homePageImg3: file3.$id,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/HomepageimgPost/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-1/3 px-2">
        <Input
          label="Title:"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug:"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <Input
          label="Home Page Image 1:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image1", { required: !HomepageimgPost })}
          onChange={(e) => handlePreview(e.target.files, "preview1")}
        />
        <Input
          label="Home Page Image 2:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image2", { required: !HomepageimgPost })}
          onChange={(e) => handlePreview(e.target.files, "preview2")}
        />
        <Input
          label="Home Page Image 3:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image3", { required: !HomepageimgPost })}
          onChange={(e) => handlePreview(e.target.files, "preview3")}
        />

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" className="w-full">
          {HomepageimgPost ? "Update" : "Submit"}
        </Button>
      </div>

      <div className="w-4/6 px-2 grid grid-cols-2 gap-4 border border-gray-500 pt-2">
        {/* First Column with two stacked images */}
        <div className="flex flex-col items-center gap-4">
          {previews.preview1 && (
            <div className="w-11/12 mb-4">
              <div className="w-full flex justify-center">
                <p className="text-center text-white w-20 bg-black">Image 1</p>
              </div>
              <img
                src={previews.preview1}
                alt="Home Page Image 1"
                className="rounded-lg"
              />
            </div>
          )}
          {previews.preview2 && (
            <div className="w-11/12 mb-4">
              <div className="w-full flex justify-center">
                <p className="text-center text-white w-20 bg-black">Image 2</p>
              </div>

              <img
                src={previews.preview2}
                alt="Home Page Image 2"
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Second Column with one centered image */}
        {previews.preview3 && (
          <div className="flex justify-center items-center">
            <div className="w-11/12 mb-4">
              <div className="w-full flex justify-center">
                <p className="text-center text-white w-20 bg-black">Image 3</p>
              </div>

              <img
                src={previews.preview3}
                alt="Home Page Image 3"
                className="rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
