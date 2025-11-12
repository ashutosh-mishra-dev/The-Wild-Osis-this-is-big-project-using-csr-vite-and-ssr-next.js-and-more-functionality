import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

// jab ham filter component ko dynamic kisi bhi table ke liye use kar rhe the
function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;

// jab ham filter component ko static kisi ek table (like cabin) ke liye use kar rhe the
// function CabinTableOperation() {
//   return (
//     <TableOperations>
//       <Filter />
//     </TableOperations>
//   );
// }

// export default CabinTableOperation;
