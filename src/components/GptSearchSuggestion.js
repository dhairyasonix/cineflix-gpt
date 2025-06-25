import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import ShimmerList from "./ShimmerList";

const GptSearchSuggestion = () => {
  const { gptMoviesResult, moviesName, showShimmer } = useSelector(
    (store) => store.gpt
  );

  return (
    (showShimmer || moviesName) && (
      <div className="bg-black p-2 md:m-4 text-white bg-opacity-90">
        <div>
          {showShimmer && (
            <>
              <ShimmerList />
              <ShimmerList />
            </>
          )}

          {moviesName &&
            moviesName?.map((movieName, index) => (
              <MovieList
                key={movieName}
                title={movieName}
                movies={gptMoviesResult[index]}
              />
            ))}
        </div>
      </div>
    )
  );
};

export default GptSearchSuggestion;
