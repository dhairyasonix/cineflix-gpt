import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryConatiner = () => {
  const movies = useSelector((store) => store?.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black ">
        <div className="md:-mt-64 -mt-[120%] z-40 relative">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
          <MovieList title={"Upcoming"} movies={movies.upcominfMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryConatiner;
