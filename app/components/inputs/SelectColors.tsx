"use client";
import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { useState, useEffect, useCallback } from "react";
import { set } from "react-hook-form";
import SelectImage from "./SelectImage";
import Button from "../Button";
interface SelectColorsProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectColors: React.FC<SelectColorsProps> = ({
  addImageToState,
  isProductCreated,
  item,
  removeImageFromState,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback(
    (value: File) => {
      setFile(value);
      addImageToState({ ...item, image: value });
    },
    [addImageToState, item]
  );
  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSelected(e.target.checked);

      if (!e.target.checked) {
        setFile(null);
        removeImageFromState(item);
      }
    },
    [removeImageFromState, item]
  );

  return (
    <div className="grid grid-cols-1  overflow-y-auto border-b-[1.2px] border-b-slate-200 items-center p-2">
      <div className="flex flow-row gap-2 items-center h-[60px] ">
        <input
          id={item.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
      </div>
      <>
        {isSelected && !file && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}

        {file && (
          <div className="flex gap-2 text-sm col-span-2 items-center justify-center">
            <p>{file.name}</p>
            <div className="w-[70px]">
              <Button
                label="Cancel"
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                }}
                small
                outline
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default SelectColors;
