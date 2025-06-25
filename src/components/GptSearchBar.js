import { useRef } from "react";
import lang from "../utils/LanguageConstants";
import { useDispatch, useSelector } from "react-redux";
import { InferenceClient } from "@huggingface/inference";
import { API_OPtion, GPT_KEY } from "../utils/constants";
import { addGptMovieResult, showGptShimmer } from "../utils/gptSlice";

// import { generateText } from './deepaiService'

// import { genrateMovies } from './deepaiService'

export const GptSearchBar = () => {
  const dispach = useDispatch();
  const langugae = useSelector((store) => store.config.lan);

  const input = useRef(null);
  const client = new InferenceClient(GPT_KEY);
  //search move tmdb
  const searchMovieTmdb = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPtion
      );

      const json = await data.json();
      return json?.results;
    } catch (error) {
      console.log("Faield to ge gpt tmdb movie search " + error.message);
    }
  };

  const heldleSearch = async () => {
    if (!input.current.value.trim()) return;
    const gptQuery = `You are a movie recommendation assistant. For the user's query:" "${input.current.value}" ", suggest exactly 5 movie titles. Respond with only the titles, separated by commas, with no additional words or formatting.For Example respond:
Inception, The Matrix, Interstellar, Parasite, The Dark Knight`;
    dispach(showGptShimmer(true));
    try {
      const gptResult = await client.chatCompletion({
        provider: "hyperbolic",
        model: "deepseek-ai/DeepSeek-R1",
        messages: [
          {
            role: "user",
            content: gptQuery,
          },
        ],
      });

      const gptMovies = gptResult?.choices[0]?.message?.content
        .replace(/<think>[\s\S]*?<\/think>/g, "")
        .trim()
        .split(",");

      // for each movie will serch tmdb api
      const prommiseArray = gptMovies?.map((movie) => searchMovieTmdb(movie));
      const tmdbResults = await Promise.all(prommiseArray);

      dispach(addGptMovieResult({ gptMovies: gptMovies, tmdbResults }));
      dispach(showGptShimmer(false));
    } catch (error) {
      console.log("Something went wrong in Gpt search " + error.message);
    }
  };

  return (
    <div className="md:w-[50%] mx-auto">
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" bg-black grid grid-cols-12"
      >
        <input
          ref={input}
          className="p-4 m-4 col-span-8 rounded-lg"
          type="text"
          placeholder={lang[langugae].gptSearchPlaceholder}
        />
        <button
          onClick={heldleSearch}
          className="p-4 mr-4 my-4 bg-red-600 text-white rounded-lg col-span-4"
        >
          {lang[langugae].search}
        </button>
      </form>
    </div>
  );
};
