import React from "react";
import SideNav from "@/components/organisms/SideNav";
import { ADMIN_NAV_BAR } from "@/utils/constants";
import { IUser } from "@/utils/types";
import { redirect } from "next/navigation";
import { NEW_USER_PATH } from "@/utils/routes";
import { getUserInfo } from "@/lib/supabase/user";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user, error } = await getUserInfo();
  if (error) {
    redirect(NEW_USER_PATH);
  }
  const getUserDetails = (user: IUser | null): IUser => {
    if (user) {
      const profile: IUser = {
        name: user.name ?? "",
        email: user.email ?? user.mobile ?? "",
      };
      return profile;
    } else {
      redirect(NEW_USER_PATH);
    }
  };
  const profile = getUserDetails(user);

  return (
    <>
      <main className="h-svh overflow-hidden flex md:flex-row flex-col">
        <div>
          <SideNav items={ADMIN_NAV_BAR} user={profile} />
        </div>
        <div className="overflow-auto px-6 pb-6 w-full">{children}</div>
      </main>
    </>
  );
}
