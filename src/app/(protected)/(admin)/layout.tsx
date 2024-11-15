import React from "react";
import SideNav from "@/components/organisms/SideNav";
import { ADMIN_NAV_BAR } from "@/utils/constants";
import { IUser } from "@/utils/types";
import { redirect } from "next/navigation";
import { SIGN_IN_PATH } from "@/utils/routes";
import { getUserInfo } from "@/lib/supabase/user";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: user, error } = await getUserInfo();
  const getUserDetails = (user: IUser | null): IUser => {
    if (error) {
      redirect(SIGN_IN_PATH);
    } else if (user) {
      const profile: IUser = {
        name: user.name ?? "",
        email: user.email ?? user.mobile ?? "",
      };
      return profile;
    } else {
      redirect(SIGN_IN_PATH);
    }
  };
  const profile = getUserDetails(user);

  return (
    <>
      <main className="h-svh overflow-hidden flex">
        <div>
          <SideNav items={ADMIN_NAV_BAR} user={profile} />
        </div>
        <div className="overflow-auto p-6 w-full">{children}</div>
      </main>
    </>
  );
};

export default AdminLayout;
