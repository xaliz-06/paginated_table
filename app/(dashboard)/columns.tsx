"use client";

import { ColumnDef } from "@tanstack/react-table";

import { UserDetails } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

// Using react-table to define the columns for the data table
export const columns: ColumnDef<UserDetails>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      // header for the id with sorting enabled through react-table API
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return <Button variant="ghost">Image</Button>;
    },
    cell: ({ row }) => {
      // rendering the image in the cells for the image column
      return (
        <Image
          src={row.getValue("image")}
          alt="prof_img"
          width={30}
          height={30}
        />
      );
    },
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      // header for the full name with sorting enabled through react-table API
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "demography",
    header: ({ column }) => {
      // header for the demography with sorting enabled through react-table API
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Demographic
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "designation",
    header: ({ column }) => {
      // header for the designation with sorting enabled through react-table API
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Designation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      // header for the location with sorting enabled through react-table API

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
