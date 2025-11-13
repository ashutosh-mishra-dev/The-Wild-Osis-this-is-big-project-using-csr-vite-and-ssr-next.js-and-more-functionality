import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

// jab ham filter component ko dynamic kisi bhi table ke liye use kar rhe the
function CabinTableOperation() {
  return (
    <TableOperations>
      {/* ------------------------------ filter -------------------------- */}
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      {/* ------------------------------ sorting -------------------------- */}
      <SortBy
        options={[
          { value: "name-asc", label: "Sort By Name (A-Z)" },
          { value: "name-desc", label: "Sort By Name (Z-A)" },

          { value: "regularPrice-asc", label: "Sort By price (low first)" },
          { value: "regularPrice-desc", label: "Sort By price (high first)" },

          { value: "maxCapacity-asc", label: "Sort By capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort By capacity (high first)" },
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
