import { INavItem, ITableColumn, IUser } from "./types";

export const BLOOD_WARRIORS = "Blood Warriors";

export const TABLE_COLUMNS: ITableColumn[] = [
  {
    key: "firstName",
    label: "First Name",
    isSortable: true,
    isSearchable: true,
  },
  {
    key: "lastName",
    label: "Last Name",
    isSortable: true,
    isSearchable: true,
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "actions",
    label: "",
  },
];

export const USER: IUser = {
  image: "https://i.pravatarcc/150?u=a04258a2462d826712d",
  name: "Ravi Kalyan",
  email: "ravi@gmail.com",
};

export const ADMIN_NAV_BAR: INavItem[] = [
  {
    icon: "group",
    label: "Users",
    path: "",
  },
  {
    label: "Manage Bridge",
    path: "",
  },
  {
    icon: "package_2",
    label: "Products",
    path: "/products",
  },
  {
    icon: "shopping_cart",
    label: "Orders",
    path: "/orders",
  },
];
