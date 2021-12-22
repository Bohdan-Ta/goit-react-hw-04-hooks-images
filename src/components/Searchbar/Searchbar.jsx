import { useState } from "react";
import PropTypes from "prop-types";

import { BsFillBinocularsFill } from "react-icons/bs";
import { toast } from "react-toastify";

import s from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleOnChange = (e) => {
    setValue(e.currentTarget.value.toLowerCase());
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      return toast.info("Please input name image......");
    }

    onSubmit(value);
    setValue("");
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleOnSubmit}>
        <input
          className={s.searchFormInput}
          onChange={handleOnChange}
          value={value}
          type="text"
          autoComplete="off"
          placeholder="Search images ......."
        />
        <button type="submit" className={s.searchFormButton}>
          <BsFillBinocularsFill
            style={{ width: "30", fill: "#3f51b5", height: "30" }}
          />
        </button>
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
