import React, { useState } from "react";
import { GptSearchBar } from "./GptSearchBar";
import GptSearchSuggestion from "./GptSearchSuggestion";
import { BACKGROUND } from "../utils/constants";

const GptSerchPage = () => {
  const [error,setError] = useState(null);
  return (
    <div>
      <div>
        <img
          className="fixed -z-10 h-screen md:w-screen object-cover brightness-[60%]"
          src={BACKGROUND}
          alt="loginBg"
        />
      </div>
      <div className="md:pt-[10%] pt-[60%] ">
        <GptSearchBar setError={setError} />
        <GptSearchSuggestion error={error} />
      </div>
    </div>
  );
};

export default GptSerchPage;
