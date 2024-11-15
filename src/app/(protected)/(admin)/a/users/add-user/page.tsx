import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import UserForm from "@/components/organisms/forms/UserForm";
import { USERS_PAGE_ROUTE } from "@/utils/routes";

const AddUserPage = () => {
  return (
    <div>
      <Breadcrumbs
        path={[
          { label: "Users", href: USERS_PAGE_ROUTE },
          { label: "Add User" },
        ]}
      />
      <UserForm />
    </div>
  );
};

export default AddUserPage;