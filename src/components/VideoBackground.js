import React from "react";
import useMovieTrailer from "../hooks/useMovieTrailler";

const VideoBackground = ({ movieId }) => {
  const trailer = useMovieTrailer(movieId);
if(!trailer) return;
  return (
    <div className="w-full h-full absolute overflow-hidden -top-32 ">
      <iframe
        className="w-full h-screen md:h-auto aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailer?.key +
          "?&autoplay=1&mute=1&loop=1&playlist=" +
          trailer?.key
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
