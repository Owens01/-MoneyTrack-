import { useQuery } from "@tanstack/react-query";
import { fetchDogs } from "@/base/libs/api/dogs.endpoint";

export const useGetDogs = () => {
  return useQuery({
    queryKey: ["dog"],
    queryFn: fetchDogs,
  });
};

async function name() {
  const data = await fetchDogs();
  console.log(data);
}

name();