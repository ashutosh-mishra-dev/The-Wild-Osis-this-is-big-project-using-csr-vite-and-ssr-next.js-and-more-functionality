import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router";

function CabinTable() {
  const [searchParams] = useSearchParams();

  const { isLoading, cabins } = useCabins(); //custom hook for getAll cabin data from supabase database using  react query

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get("discount") || "all";
  //console.log(filterValue);

  // 1) FILTER
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //2. SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  //console.log(sortBy);
  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {/* hamne yha compaund component ke sath sath render props pattern ka bhi use kiya (render se props pattern)  */}
        <Table.Body
          //data={cabins}
          //data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
