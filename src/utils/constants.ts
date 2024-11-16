import {
  BRIDGES_PAGE_ROUTE,
  SCHEDULE_DONATION_PAGE_ROUTE,
  TRACK_BLOOD_DONATION_CAMP_PAGE_ROUTE,
  TRACK_DONATION_PAGE_ROUTE,
  TRACK_TRANSFUSION_PAGE_ROUTE,
  USERS_PAGE_ROUTE,
} from "./routes";
import { INavItem, ISelectItem, ITableColumn, IUser } from "./types";

export const BLOOD_WARRIORS = "Blood Warriors";

export const BLOOD_WARRIORS_ORGANIZATION_ID = "O01";

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
    label: "Schedule Donation",
    path: SCHEDULE_DONATION_PAGE_ROUTE,
  },
  {
    icon: "water_drop",
    label: "Track Donation",
    path: TRACK_DONATION_PAGE_ROUTE,
  },
  {
    icon: "vaccines",
    label: "Track Transfusion",
    path: TRACK_TRANSFUSION_PAGE_ROUTE,
  },
  {
    icon: "camping",
    label: "Track Blood Donation Camp",
    path: TRACK_BLOOD_DONATION_CAMP_PAGE_ROUTE,
  },
];

export const DONATION_TYPE: ISelectItem[] = [
  {
    label: "One Time Donation",
    value: "1",
  },
  {
    label: "Blood Bridge Donation",
    value: "2",
  },
  {
    label: "Emergency Donation",
    value: "3",
  },
];

export const BLOOD_GROUP: ISelectItem[] = [
  {
    label: "A Positive",
    value: "1",
  },
  {
    label: "A Negative",
    value: "2",
  },
  {
    label: "B Positive",
    value: "3",
  },
  {
    label: "B Negative",
    value: "4",
  },
  {
    label: "AB Positive",
    value: "5",
  },
  {
    label: "AB Negative",
    value: "6",
  },
  {
    label: "O Positive",
    value: "7",
  },
  {
    label: "O Negative",
    value: "8",
  },
];

export const BLOOD_TYPE: ISelectItem[] = [
  {
    label: "Whole Blood",
    value: "1",
  },
  {
    label: "Red Blood Cells",
    value: "2",
  },
  {
    label: "Plasma",
    value: "3",
  },
  {
    label: "Platelets",
    value: "4",
  },
  {
    label: "Cryoprecipitate",
    value: "5",
  },
  {
    label: "Granulocytes",
    value: "6",
  },
];

export const DONATION_STATUS_TYPE: ISelectItem[] = [
  {
    label: "Scheduled",
    value: "1",
  },
  {
    label: "Cancelled",
    value: "2",
  },
  {
    label: "Complete",
    value: "3",
  },
  {
    label: "Rejected",
    value: "4",
  },
  {
    label: "Absent",
    value: "5",
  },
  {
    label: "Pending",
    value: "6",
  },
];

export const GENDER: ISelectItem[] = [
  {
    label: "Male",
    value: "1",
  },
  {
    label: "Female",
    value: "2",
  },
  {
    label: "Non-binary",
    value: "3",
  },
  {
    label: "Other",
    value: "4",
  },
  {
    label: "Prefer not to say",
    value: "5",
  },
];

export const GUARDIAN_RELATIONSHIP: ISelectItem[] = [
  {
    label: "Father",
    value: "1",
  },
  {
    label: "Mother",
    value: "2",
  },
  {
    label: "Son",
    value: "3",
  },
  {
    label: "Daughter",
    value: "4",
  },
  {
    label: "Spouse",
    value: "5",
  },
  {
    label: "Uncle",
    value: "6",
  },
  {
    label: "Aunt",
    value: "7",
  },
  {
    label: "Other",
    value: "8",
  },
];
