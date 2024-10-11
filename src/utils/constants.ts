import { BRIDGES_PAGE_ROUTE, USERS_PAGE_ROUTE } from "./routes";
import { INavItem, ITableColumn, IUser } from "./types";

export const BLOOD_WARRIORS = "Blood Warriors";

export const USERS_TABLE_COLUMNS: ITableColumn[] = [
  {
    key: "name",
    label: "Name",
    isSortable: true,
    isSearchable: true,
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "mobile",
    label: "Phone",
  },
  {
    key: "gender",
    label: "Gender",
  },
  {
    key: "blood_group",
    label: "Blood Group",
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
    path: USERS_PAGE_ROUTE,
  },
  {
    icon: "bloodtype",
    label: "Bridges",
    path: BRIDGES_PAGE_ROUTE,
  },
  {
    icon: "volunteer_activism",
    label: "Volunteers",
    path: "/products",
  },
  {
    icon: "diversity_3",
    label: "Donors",
    path: "/orders",
  },
];
