import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailler";
import { addPlayNow } from "../utils/movieSlice";

const PlayNow = () => {
  const [showFull, setShowFull] = useState(false);
  const dispatch = useDispatch();
  const movie = useSelector((store) => store.movies.PlayNow);
  const { id, title, overview, vote_average, release_date, original_language } =
    movie;
  const trailer = useMovieTrailer(id);
  console.log(id);
  const handleToggle = () => {
    dispatch(addPlayNow(null));
  };
  
  

  const wordLimit = 56;
  const words = overview?.split(" ") || [];

  const shouldShowToggle = words.length > wordLimit;

  const displayedText = showFull
    ? overview
    : words.slice(0, wordLimit).join(" ") + (shouldShowToggle ? "..." : "");

  return (
    <div className="w-full h-screen bg-black bg-opacity-75 fixed z-[999]  "
    onClick={handleToggle}>
      <div className=" mt-[10vh] relative md:w-[45%]  bg-[#111827] mx-auto rounded-2xl" onClick={(e) => e.stopPropagation()} >
        <button
          onClick={handleToggle}
          className="m-2 px-2  text-lg rounded-full bg-white absolute text-red-600 z-30 top-0 right-0 hover:bg-red-500 hover:text-white"
        >
          X
        </button>
        <div className="relative w-full aspect-video overflow-hidden">
          {trailer && (
            <iframe
              className="absolute inset-0 w-full h-full rounded-t-2xl"
              src={
                "https://www.youtube.com/embed/" +
                trailer?.key +
                "?autoplay=1&loop=1&playlist=" +
                trailer?.key +
                "&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0"
              }
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          )}
        </div>

        <div className="py-4 px-6  text-white">
          <h2 className="text-xl font-bold my-2">{title}</h2>
          <p className="my-2 text-md">
      {displayedText}
      {shouldShowToggle && (
        <span
          onClick={() => setShowFull(!showFull)}
          className="text-gray-500 font-bold cursor-pointer ml-2"
        >
          {showFull ? "Show less" : "Show more"}
        </span>
      )}
    </p>
          <div className="my-4 ">
            <span className="bg-white text-black text-md mr-16  md:mr-4 px-2 md:py-2 py-1 rounded-sm inline-block mb-4 md:mb-0">
              Release Date: {release_date}
            </span>
            <span className="bg-white text-black text-md mr-4 px-2 md:py-2 py-1 rounded-sm">
              Rating: {vote_average}
            </span>
            <span className="bg-white  text-black text-md  px-2 md:py-2 py-1 rounded-sm">
              Language: {original_language.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayNow;
