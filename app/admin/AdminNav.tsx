"use client";
import Link from "next/link";
import Container from "../components/Container";
import AdminNavItem from "./AdminNavItem";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { usePathname } from "next/navigation";

const AdminNav = () => {
  const path = usePathname();
  return (
    <div className="w-full shadow-md top-20 border-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-wrap">
          <Link href="/admin">
            <AdminNavItem
              label="Summary"
              icon={MdDashboard}
              selected={path === "/admin"}
            />
          </Link>
          <Link href="/admin/add-products">
            <AdminNavItem
              label="Add Products"
              icon={MdLibraryAdd}
              selected={path.includes("add-products")}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItem
              label="Manage Products"
              icon={MdDns}
              selected={path.includes("manage-products")}
            />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminNavItem
              label="Manage Orders"
              icon={MdFormatListBulleted}
              selected={path.includes("manage-orders")}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
