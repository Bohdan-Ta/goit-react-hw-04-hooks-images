import { useState } from "react";
import { ToastContainer } from "react-toastify";

import Sections from "../Section/Section";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery";
import Modal from "../Modal";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalPicture, setModalPicture] = useState({ src: "", alt: "" });

  const getNameImage = (searchValue) => {
    setSearchValue(searchValue);
  };

  const toggleModal = (src, alt) => {
    setShowModal(!showModal);
    setModalPicture({ src, alt });
  };

  return (
    <div>
      <Searchbar onSubmit={getNameImage} />
      <Sections>
        <ImageGallery imageName={searchValue} openModal={toggleModal} />
      </Sections>
      {showModal && <Modal onClose={toggleModal} modalPicture={modalPicture} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
