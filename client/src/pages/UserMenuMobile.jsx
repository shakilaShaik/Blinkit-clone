import React from "react";
import UserMenu from "../components/UserMenu";

export const UserMenuMobile = () => {
  return (
    <section className="bg-white h-full w-full py-8">
      <div className="container mx-auto p-3">
        <UserMenu />
      </div>
    </section>
  );
};

export default UserMenuMobile;
