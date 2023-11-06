/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Modal";

const NewNote = ({ setRecargar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRecargar(true);
  };
  return (
    <>
      {isModalOpen && (
        <Modal setRecargar={setRecargar} closeModal={closeModal} />
      )}

      <button
        onClick={openModal}
        className="w-14 h-14 rounded-full fixed bottom-10 right-10 z-50 bg-gradient-to-r from-ripe-plum-400 to-ripe-plum-500 hover:from-ripe-plum-500 hover:to-ripe-plum-600 text-ripe-plum-50 text-4xl hover:cursor-pointer"
      >
        +
      </button>
    </>
  );
};

export default NewNote;
