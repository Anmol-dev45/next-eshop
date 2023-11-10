"use client";

import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import { categories } from "@/utils/Categories";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      nname: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      inStock: false,
      images: [],
    },
  });
  const category = watch("category");

  const setConstantValue = (id: string, value: any) => {
    setValue(id, value),
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      };
  };
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
        <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-3jjj">
          {categories.map((item) => {
            if (item.label === "All") return null;
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  label={item.label}
                  onClick={(category) => setConstantValue("category", category)}
                  selected={item.label === category}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
