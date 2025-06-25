import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPlayNow } from "../utils/movieSlice";

const MovieCard = ({ movies }) => {
  const dispatch = useDispatch();

  if (movies.poster_path === null) return;
  const handlePlay = () => {
    dispatch(addPlayNow(movies));
  };

  return (
    <div
      className="md:w-36 overflow-hidden w-32  rounded-lg"
      onClick={handlePlay}
    >
      <img
        className="transform transition-transform duration-200 hover:scale-[115%] origin-center  cursor-pointer"
        src={IMG_CDN_URL + movies?.poster_path}
        alt="movie card"
      ></img>
    </div>
  );
};

export default MovieCard;
