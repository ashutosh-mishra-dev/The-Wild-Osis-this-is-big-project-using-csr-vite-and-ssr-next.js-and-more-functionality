import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  // useQueryClient Ye ek React Query ka cache manager hai. Aap isse manually caching aur refetch control kar sakte ho.
  const queryClient = useQueryClient();

  //useMutation : React Query ka hook hai jo data change karne wali API calls ke liye use hota hai (jisme POST, PUT, PATCH, DELETE aata hai).
  //mutationFn: yah ek aisa function jo api method call karta h
  //queryClient.invalidateQueries: ye bolta h ki cache delete karo aur API refetch karo
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("cabin successfully deleted");

      // React Query ko batata hai ki "cabins" wala data ab outdated ho gaya hai to dobara refetch karo (latest data le lo).
      queryClient.invalidateQueries({
        queryKey: ["cabins"], // ye aapne pahle fech ke time chache memory identify ke liye jo name likha vhi yha dubara use karo ge durana name jaise abc use karo ge to re-fetch nhi hoga
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return (
    <TableRow>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} Guests </div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
        Delete
      </button>
    </TableRow>
  );
}

export default CabinRow;
