"use client";

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div>
        <div className="relative z-30">
          <div
            onClick={toggleOpen}
            className="p-2 border-[1px] border-slate-400 flex items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
          >
            <Avatar />
            <AiFillCaretDown />
          </div>
          {isOpen && (
            <div className="absolute top-12 right-0 z-10 w-44 bg-white shadow-md rounded-md flex flex-col cursor-pointer text-sm">
              {currentUser ? (
                <div>
                  <Link href={"/orders"}>
                    <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                  </Link>
                  <Link href={"/admin"}>
                    <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                  </Link>
                  <hr />
                  <MenuItem
                    onClick={() => {
                      toggleOpen();
                      signOut();
                    }}
                  >
                    Logout
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <Link href={"/login"}>
                    <MenuItem onClick={toggleOpen}>Login</MenuItem>
                  </Link>
                  <Link href={"/register"}>
                    <MenuItem onClick={toggleOpen}>Register</MenuItem>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  );
};

export default UserMenu;
