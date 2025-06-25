import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return;

  return (
    <div className="md:pl-6 px-2 text-white">
      <h1 className="text-xl md:text-3xl py-4">{title}</h1>

      <div className="flex scroll-container overflow-x-scroll scrollbar-hiden ">
        <div className="flex space-x-4">
          {movies?.map((movies) => (
            <MovieCard key={movies.id} movies={movies} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
