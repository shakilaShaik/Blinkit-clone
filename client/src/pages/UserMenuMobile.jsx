import React from "react";
import UserMenu from "../components/UserMenu";
import { IoClose } from "react-icons/io5";

export const UserMenuMobile = () => {
  return (
    <section className="bg-white h-full w-full py-8">
      <button
        onClick={() => window.history.back()}
        className="text-neutral-800 block w-fit ml-auto py-2 px-3"
      >
        <IoClose size={24} />
      </button>

      <div className="container mx-auto px-3 py-5 pb-8">
        <UserMenu />
      </div>
    </section>
  );
};

export default UserMenuMobile;
