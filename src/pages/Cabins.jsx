import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(function () {
    //ye promise ka throw data ko la rhe h
    getCabins().then((data) => console.log(data));

    //-------- async await ke throw data la rhe h  ----------------------
    // async function fetchCabins() {
    //   const data = await getCabins();
    //   console.log(data);
    // }
    // fetchCabins();
    //-----------------------------------------------------------
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      {/* <img
        src="https://sarzztxidxgnsbagvswl.supabase.co/storage/v1/object/public/cabin-images/cabin-005.jpg"
        alt="cabin"
      /> */}
    </Row>
  );
}

export default Cabins;
