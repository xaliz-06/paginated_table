"use client";

import { useState } from "react";

import { useGetUsers } from "@/api/use-get-users";

import { columns } from "./columns";

import DataTable from "@/components/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

import { TotalDetails, UserDetails } from "@/lib/types";
import { transformUserData } from "@/lib/utils";

const Page = () => {
  // states to manage the page index and filter values
  const [pageIndex, setPageIndex] = useState(0);
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");

  // page size or limit of records per page
  const pageSize = 10;

  // Using the custom hook to get the users data
  const usersQuery = useGetUsers(pageIndex, pageSize, filterKey, filterValue);

  const users = usersQuery.data;

  let usersDetails: UserDetails[] = [];
  let totalDetails: TotalDetails = { total: 0, limit: 10, skip: 0 };
  if (users && !usersQuery.isError) {
    usersDetails = transformUserData(users); //transforming the data to the required format if data is found
    totalDetails = {
      // setting the total details for pagination from the users data received
      total: users.total,
      skip: users.skip,
      limit: users.limit,
    };
  }

  const isDisabled = usersQuery.isLoading;

  // Shows a skeleton till the data is ready to be shown
  if (usersQuery.isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-2 mt-4 md:p-8 md:mt-8">
        <div className="max-w-screen-2xl mx-auto w-[95vw] lg:w-full pb-8 mt-18">
          <Card className="border-none drop-shadow-sm">
            <CardHeader>
              <Skeleton className="h-8 w-full" />
            </CardHeader>
            <CardContent className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-400 animate-spin" />
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // The Data Table is the component where the table would be rendered
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 mt-4 md:p-8 md:mt-8">
      <div className="max-w-screen-2xl mx-auto w-[95vw] lg:w-full pb-8 mt-18">
        <Card className="border-none drop-shadow-sm">
          <CardContent>
            <DataTable
              columns={columns}
              totalDetails={totalDetails}
              data={usersDetails}
              disabled={isDisabled}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              filterKey={filterKey}
              setFilterKey={setFilterKey}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Page;
