import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import UserForm from "@/components/organisms/forms/UserForm";
import { createClient } from "@/lib/supabase/client";
import { USERS_PAGE_ROUTE } from "@/utils/routes";

const EditUserPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { data: userData } = await supabase
    .from("user_data")
    .select("*, roles:mapping_user_role!fk_user_id(role_id)")
    .eq("mapping_user_role.role_status", true)
    .eq("user_id", params.id)
    .single();
  return (
    <div>
      <Breadcrumbs
        path={[
          { label: "Users", href: USERS_PAGE_ROUTE },
          { label: "Edit User" },
          { label: userData?.name || "" },
        ]}
      />
      <UserForm userData={userData} />
    </div>
  );
};

export default EditUserPage;
