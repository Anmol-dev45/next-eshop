"use client";
import Container from "../Container";
import { categories } from "@/utils/Categories";
import Category from "./Category";
import { useSearchParams, usePathname } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const category = params.get("category") || "All";

  const pathName = usePathname();

  const isHome = pathName === "/";
  if (!isHome) {
    return null;
  }
  return (
    <div className="bg-white">
      <Container>
        <div className="pt-4 flex items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <Category
              icon={item.icon}
              label={item.label}
              selected={category === item.label}
              key={item.label}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
