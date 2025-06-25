import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainConatiner = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;
  const { id } = movies[1];

  return (
    <div className="">
      <VideoBackground movieId={id} />
      <VideoTitle movie={movies[1]} />
    </div>
  );
};

export default MainConatiner;
