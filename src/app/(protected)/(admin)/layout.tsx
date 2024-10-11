import React from "react";
import SideNav from "@/components/organisms/SideNav";
import { ADMIN_NAV_BAR } from "@/utils/constants";
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { IUser } from "@/utils/types";
import { redirect } from "next/navigation";
import { SIGN_IN_PATH } from "@/utils/routes";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const getUserDetails = (user: User | null): IUser => {
    if (user) {
      const profile: IUser = {
        name: user.email ?? "",
        email: user.email ?? "",
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
