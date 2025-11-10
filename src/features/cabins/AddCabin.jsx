//import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

// here we are using Compound component
function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* here example of mutiple modal window */}
      <Modal.Open opens="table">
        <Button>Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [iswOpenModal, setIswOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIswOpenModal((show) => !show)}>
//         {iswOpenModal === false ? "Add New Cabin" : "Close Cabin"}
//       </Button>
//       {iswOpenModal && (
//         <Modal onClose={() => setIswOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIswOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
