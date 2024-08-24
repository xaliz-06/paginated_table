import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { UsersResponseType } from "@/lib/types";
import axios from "axios";

// React Query + Axios for fetching data

// Custom hook to get the Users. Takes the page size and page index for pagination, key and string for filtering
// This API only accepts one key and value for filtering so filtering from the API calls for both gender and age is not possible
export const useGetUsers = (
  pageIndex: number,
  pageSize: number,
  key?: string,
  value?: string
) => {
  const limit = pageSize; // Number of records per page needed
  const skip = pageSize * pageIndex; // Skip is calculated based on the page index and page size

  // React Query hook to fetch the data of UsersResponseType
  const query = useQuery<UsersResponseType>({
    queryKey: ["users", { limit, skip, key, value }], // query dependencies
    queryFn: async () => {
      const response = await axios.get<UsersResponseType>(
        key && value
          ? "https://dummyjson.com/users/filter" // API endpoint for fetching users with filters
          : "https://dummyjson.com/users/", // API endpoint for just fetching users without filters
        {
          params: {
            limit: limit,
            skip: skip, // Pagination parameters
            ...(key && value ? { key, value } : {}), // Parameters for filtering
          },
        }
      );

      return response.data; // return only the data from the response
    },
    placeholderData: keepPreviousData, // keep the previous data while refetching for new parameters to avoid flickering between No Records and the data
  });

  return query;
};
