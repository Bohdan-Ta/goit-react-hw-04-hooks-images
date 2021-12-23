import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { toast } from "react-toastify";

import { fetchAPI } from "../../servises/getApi";
import ImageDataView from "./ImageDataView";
import Spinner from "../Loader";

import s from "./ImageGallery.module.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function ImageGallery({ imageName, openModal }) {
  const [imagesArray, setImagesArray] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [prevName, setPrevName] = useState(null);

  useEffect(() => {
    if (!imageName) {
      return;
    }

    if (prevName !== imageName) {
      setImagesArray([]);
    }

    setStatus(Status.PENDING);

    const fetchData = async () => {
      try {
        const result = await fetchAPI(imageName, page);
        const { hits, totalHits } = result;
        if (hits.length === 0 && totalHits === 0) {
          return toast.info("Try to input next name... ");
        }
        if (hits.length === 0 && totalHits !== 0) {
          return toast.info("Nothing more found");
        }
        setPrevName(imageName);
        setImagesArray((prevImagesArray) => [...prevImagesArray, ...hits]);
        setStatus(Status.RESOLVED);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [imageName, page]);

  const updatePage = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      {status === "idle" && (
        <h1 className={s.title}>What do you want to see?</h1>
      )}

      {status === "pending" && <Spinner />}

      {(status === "resolved" || status === "pending") && (
        <ImageDataView
          imagesArray={imagesArray}
          openModal={openModal}
          loadMore={updatePage}
        />
      )}

      {status === "rejected" &&
        toast.error("We are sorry but something went wrong")}
    </>
  );
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
