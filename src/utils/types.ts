export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export enum UserRole {
  VOLUNTEER = "Volunteer",
  BRIDGE_DONOR = "Bridge Donor",
  EMERGENCY_DONOR = "Emergency Donor",
  PATIENT = "Patient",
  GUEST = "Guest",
}

export interface ITableColumn {
  key: string;
  label: string;
  isSortable?: boolean;
  isSearchable?: boolean;
}

export interface IUser {
  image?: string;
  name: string;
  email: string;
  mobile?: string;
}

export interface INavItem {
  label: string;
  path?: string;
  icon?: string;
}

export interface ISelectItem {
  label: string;
  value: string;
}
