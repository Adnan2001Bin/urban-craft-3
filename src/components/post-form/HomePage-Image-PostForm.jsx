// import React, { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, Select } from "..";
// import appwriteService from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function HomePage_Image_PostForm({ post }) {
//   const { register, handleSubmit, watch, setValue, getValues } =
//     useForm({
//       defaultValues: {
//         title: post?.title || "",
//         slug: post?.$id || "",
//         status: post?.status || "active",
//       },
//     });

//   const navigate = useNavigate();
//   const userData = useSelector((state) => state.auth.userData);

//   const submit = async (data) => {
//     // Upload images
//     const homePageImg1 = data.image1[0]
//       ? await appwriteService.uploadFile(data.image1[0])
//       : null;
//     const homePageImg2 = data.image2[0]
//       ? await appwriteService.uploadFile(data.image2[0])
//       : null;
//     const homePageImg3 = data.image3[0]
//       ? await appwriteService.uploadFile(data.image3[0])
//       : null;

//     if (post) {
//       // Delete old images if new ones are uploaded
//       if (homePageImg1) appwriteService.deleteFile(post.homePageImg1);
//       if (homePageImg2) appwriteService.deleteFile(post.homePageImg2);
//       if (homePageImg3) appwriteService.deleteFile(post.homePageImg3);

//       // Update post with new image IDs
//       const dbPost = await appwriteService.updatePost(post.$id, {
//         ...data,
//         homePageImg1: homePageImg1 ? homePageImg1.$id : post.homePageImg1,
//         homePageImg2: homePageImg2 ? homePageImg2.$id : post.homePageImg2,
//         homePageImg3: homePageImg3 ? homePageImg3.$id : post.homePageImg3,
//       });

//       if (dbPost) {
//         navigate(`/post/${dbPost.$id}`);
//       }
//     } else {
//       // Create a new post with the uploaded image IDs
//       const dbPost = await appwriteService.createPost({
//         ...data,
//         homePageImg1: homePageImg1?.$id,
//         homePageImg2: homePageImg2?.$id,
//         homePageImg3: homePageImg3?.$id,
//         userId: userData.$id,
//       });

//       if (dbPost) {
//         navigate(`/post/${dbPost.$id}`);
//       }
//     }
//   };

//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === "string")
//       return value
//         .trim()
//         .toLowerCase()
//         .replace(/[^a-zA-Z\d\s]+/g, "-")
//         .replace(/\s/g, "-");

//     return "";
//   }, []);

//   React.useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name === "title") {
//         setValue("slug", slugTransform(value.title), { shouldValidate: true });
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [watch, slugTransform, setValue]);

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//       <div className="w-2/3 px-2">
//         <Input
//           label="Title :"
//           placeholder="Title"
//           className="mb-4"
//           {...register("title", { required: true })}
//         />
//         <Input
//           label="Slug :"
//           placeholder="Slug"
//           className="mb-4"
//           {...register("slug", { required: true })}
//           onInput={(e) => {
//             setValue("slug", slugTransform(e.currentTarget.value), {
//               shouldValidate: true,
//             });
//           }}
//         />
//       </div>
//       <div className="w-1/3 px-2">
//         <Input
//           label="Home Page Image 1:"
//           type="file"
//           className="mb-4"
//           accept="image/png, image/jpg, image/jpeg, image/gif"
//           {...register("image1", { required: !post })}
//         />
//         {post?.homePageImg1 && (
//           <div className="w-full mb-4">
//             <img
//               src={appwriteService.getFilePreview(post.homePageImg1)}
//               alt={post.title}
//               className="rounded-lg"
//             />
//           </div>
//         )}
//         <Input
//           label="Home Page Image 2:"
//           type="file"
//           className="mb-4"
//           accept="image/png, image/jpg, image/jpeg, image/gif"
//           {...register("image2", { required: !post })}
//         />
//         {post?.homePageImg2 && (
//           <div className="w-full mb-4">
//             <img
//               src={appwriteService.getFilePreview(post.homePageImg2)}
//               alt={post.title}
//               className="rounded-lg"
//             />
//           </div>
//         )}
//         <Input
//           label="Home Page Image 3:"
//           type="file"
//           className="mb-4"
//           accept="image/png, image/jpg, image/jpeg, image/gif"
//           {...register("image3", { required: !post })}
//         />
//         {post?.homePageImg3 && (
//           <div className="w-full mb-4">
//             <img
//               src={appwriteService.getFilePreview(post.homePageImg3)}
//               alt={post.title}
//               className="rounded-lg"
//             />
//           </div>
//         )}
//         <Select
//           options={["active", "inactive"]}
//           label="Status"
//           className="mb-4"
//           {...register("status", { required: true })}
//         />
//         <Button
//           type="submit"
//           bgColor={post ? "bg-green-500" : undefined}
//           className="w-full"
//         >
//           {post ? "Update" : "Submit"}
//         </Button>
//       </div>
//     </form>
//   );
// }


import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      status: post?.status || "active",
    },
  });

  const [previews, setPreviews] = useState({
    preview1: post ? appwriteService.getFilePreview(post.homePageImg1) : null,
    preview2: post ? appwriteService.getFilePreview(post.homePageImg2) : null,
    preview3: post ? appwriteService.getFilePreview(post.homePageImg3) : null,
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

    if (post) {
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        homePageImg1: file1 ? file1.$id : post.homePageImg1,
        homePageImg2: file2 ? file2.$id : post.homePageImg2,
        homePageImg3: file3 ? file3.$id : post.homePageImg3,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      if (file1 && file2 && file3) {
        const dbPost = await appwriteService.createPost({
          ...data,
          homePageImg1: file1.$id,
          homePageImg2: file2.$id,
          homePageImg3: file3.$id,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
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
      <div className="w-2/3 px-2">
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
          {...register("image1", { required: !post })}
          onChange={(e) => handlePreview(e.target.files, "preview1")}
        />
        <Input
          label="Home Page Image 2:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image2", { required: !post })}
          onChange={(e) => handlePreview(e.target.files, "preview2")}
        />
        <Input
          label="Home Page Image 3:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image3", { required: !post })}
          onChange={(e) => handlePreview(e.target.files, "preview3")}
        />
      </div>
      <div className="w-1/3 px-2">
        {previews.preview1 && (
          <div className="w-full mb-4">
            <img src={previews.preview1} alt="Home Page Image 1" className="rounded-lg" />
          </div>
        )}
        {previews.preview2 && (
          <div className="w-full mb-4">
            <img src={previews.preview2} alt="Home Page Image 2" className="rounded-lg" />
          </div>
        )}
        {previews.preview3 && (
          <div className="w-full mb-4">
            <img src={previews.preview3} alt="Home Page Image 3" className="rounded-lg" />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

