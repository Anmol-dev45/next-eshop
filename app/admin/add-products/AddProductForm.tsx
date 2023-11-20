/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import SelectColors from "@/app/components/inputs/SelectColors";
import TextArea from "@/app/components/inputs/TextArea";
import { app } from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useState, useEffect, useCallback } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import toast from "react-hot-toast";
import axios from "axios";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const router = useRouter();

  const [isProductCreated, setIsProductCreated] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      inStock: false,
      images: [],
    },
  });

  useEffect(() => {
    setCostomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product Data", data);

    setLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setLoading(false);
      return toast.error("Please select a category");
    }
    if (!data.images || data.images.length === 0) {
      setLoading(false);
      return toast.error("Please select a image");
    }

    const handleImageUpload = async () => {
      toast("Creating Product");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + item.image.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTasks = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTasks.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");

                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error uploading image", error);
                  reject(error);
                },
                //handle success
                () => {
                  getDownloadURL(uploadTasks.snapshot.ref)
                    .then((downloadURL) => {
                      console.log("File available at", downloadURL);
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the downloadURL", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setLoading(false);
        console.log("Error uploading image", error);
        return toast.error("Error uploading image");
      }
    };

    await handleImageUpload();
    const productData = {
      ...data,
      images: uploadedImages,
    };

    axios
      .post("/api/products", productData)
      .then(() => {
        toast.success("Product created");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        console.log("Error creating product", error);
        toast.error("Error creating product");
      })
      .finally(() => setLoading(false));

    console.log("Product Data", productData);
  };

  const category = watch("category");

  const setCostomValue = (id: string, value: any) => {
    setValue(id, value),
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      };
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return null;
      }
      return prev.filter((item) => item.color !== value.color);
    });
  }, []);

  return (
    <>
      <Heading title="Add a Product" center />
      <Input
        id="name"
        label="Name"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={loading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox
        id="inStock"
        label="This product is in stock"
        register={register}
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-3">
          {categories.map((item) => {
            if (item.label === "All") return null;
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  label={item.label}
                  onClick={(category) => setCostomValue("category", category)}
                  selected={item.label === category}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4 ">
        <div>
          <div className="font-bold">
            Select the available product colors and upload their images
          </div>
          <div className="text-sm">
            You must upload an image for each of the color selected otherwise
            your color selection will be ignored.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item) => {
            return (
              <SelectColors
                key={item.color}
                item={item}
                removeImageFromState={removeImageFromState}
                addImageToState={addImageToState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <Button
        label={loading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
