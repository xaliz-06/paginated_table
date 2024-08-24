import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { UserDetails, UsersResponseType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to Transform data from the APIs to the required object format for displaying
export function transformUserData(users: UsersResponseType): UserDetails[] {
  return users.users.map((user) => ({
    id: user.id,
    image: user.image,
    fullName: `${user.firstName} ${user.maidenName} ${user.lastName}`,
    demography: `${user.gender[0].toUpperCase()}/${user.age}`, // demography is the Gender and the Age
    designation: user.company.title,
    location: `${user.address.state}, ${user.address.country}`, // location is the address state and the country
  }));
}

// Function to Calculate the Total Number of Pages for Pagination
export function calculateTotalPages(
  totalRows: number,
  pageSize: number
): number {
  return Math.ceil(totalRows / pageSize);
}

// Gender Option for Gender Filtering
export const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  // {
  //   label: "Both",
  //   value: "",
  // },
];
