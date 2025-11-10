import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [iswOpenModal, setIswOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIswOpenModal((show) => !show)}>
        {iswOpenModal === false ? "Add New Cabin" : "Close Cabin"}
      </Button>
      {iswOpenModal && (
        <Modal onClose={() => setIswOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIswOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
