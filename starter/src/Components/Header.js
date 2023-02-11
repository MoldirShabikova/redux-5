import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDisplayCountry,
  selectDisplay,
} from "../redux/slices/displayCountrySlice";
import { setLoadingFalse, setLoadingTrue } from "../redux/slices/loadingSlice";
import {
  deletePotentialCountries,
  setPotentialCountries,
} from "../redux/slices/potentialCountriesSlice";

import { BsFillFlagFill } from "react-icons/bs";
const Header = () => {
  const dispatch = useDispatch();

  let currentDisplay = useSelector(selectDisplay);
  const [input, setInput] = useState();
  return (
    <div className="header">
      <div className="home">
        <BsFillFlagFill style={{ marginRight: "10px" }} fontSize="1.6em" />
        <h3 className="home-country">
          {currentDisplay && currentDisplay.name.common}
        </h3>
      </div>
      <div className="country-input">
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            dispatch(setLoadingTrue());
            axios
              .get(`https://restcountries.com/v3.1/name/${input}`)
              .then((res) => {
                dispatch(deleteDisplayCountry());
                dispatch(deletePotentialCountries());
                dispatch(
                  // this is an object
                  setPotentialCountries(res.data)
                );
                dispatch(setLoadingFalse());
              })
              .catch((err) => {
                dispatch(setLoadingFalse());
                alert("No countries found that match your search!");
              });
          }}
        >
          search
        </button>
      </div>
    </div>
  );
};

export default Header;
