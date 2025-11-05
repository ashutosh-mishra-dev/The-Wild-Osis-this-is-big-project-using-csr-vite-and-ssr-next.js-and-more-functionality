import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  // useQueryClient Ye ek React Query ka cache manager hai. Aap isse manually caching aur refetch control kar sakte ho.
  const queryClient = useQueryClient();

  //useMutation : React Query ka hook hai jo data change karne wali API calls ke liye use hota hai (jisme POST, PUT, PATCH, DELETE aata hai).
  //mutationFn: yah ek aisa function jo api method call karta h
  //queryClient.invalidateQueries: ye bolta h ki cache delete karo aur API refetch karo

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("cabin successfully deleted");

      // React Query ko batata hai ki "cabins" wala data ab outdated ho gaya hai to dobara refetch karo (latest data le lo).
      queryClient.invalidateQueries({
        queryKey: ["cabins"], // ye aapne pahle fech ke time chache memory identify ke liye jo name likha vhi yha dubara use karo ge durana name jaise abc use karo ge to re-fetch nhi hoga
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
