import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductPostform({ product }) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      productTitle: product?.productTitle || "",
      productPrice: product?.productPrice || "",
      slug: product?.$id || "",
      status: product?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (product) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(product.productImg);
      }

      const dbPost = await appwriteService.updateProduct(product.$id, {
        ...data,
        productImg: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/product/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.productImg = fileId;
        const dbPost = await appwriteService.createProduct({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/product/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "productTitle") {
        setValue("slug", slugTransform(value.productTitle), {
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
          label="Product Title :"
          placeholder="Product Title"
          className="mb-4"
          {...register("productTitle", { required: true })}
        />

        <Input
          label="Slug :"
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
          label="Product Price :"
          placeholder="Product Price"
          className="mb-4"
          {...register("productPrice", { required: true })}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !product })}
        />

        {product && (
          <div>
            <img
              src={appwriteService.getFilePreview(product.productImg)}
              alt={product.productTitle}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={product ? "bg-green-500" : undefined}
          className="w-full"
        >
          {product ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
