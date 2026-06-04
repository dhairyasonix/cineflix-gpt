import { useRef, useState } from "react";
import lang from "../utils/LanguageConstants";
import { useDispatch, useSelector } from "react-redux";
import { InferenceClient } from "@huggingface/inference";
import { API_OPtion, GPT_KEY } from "../utils/constants";
import { addGptMovieResult, showGptShimmer } from "../utils/gptSlice";

const models = {
  "DeepSeek-V4-Pro": "deepseek-ai/DeepSeek-V4-Pro:fireworks-ai",
  "NVIDIA-Nemotron": "nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4:together",
  "DeepSeek-V4-Flash": "deepseek-ai/DeepSeek-V4-Flash:fireworks-ai",
  Qwen: "Qwen/Qwen3-Coder-Next:novita",
  "OpenAI GPT-OSS-20B": "openai/gpt-oss-20b:fireworks-ai",
};

export const GptSearchBar = ({ setError }) => {
  const dispach = useDispatch();
  const langugae = useSelector((store) => store.config.lan);

  const input = useRef(null);
  const client = new InferenceClient(GPT_KEY);
  const [selectedModel, setSelectedModel] = useState(
    models["DeepSeek-V4-Flash"],
  );
  //search move tmdb
  const searchMovieTmdb = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPtion,
      );

      const json = await data.json();
      return json?.results;
    } catch (error) {
      console.log("Faield to ge gpt tmdb movie search " + error.message);
      setError("Failed to search movies");
    }
  };

  const heldleSearch = async () => {
    if (!input.current.value.trim()) return;
    setError(null);
    const gptQuery = `You are a movie recommendation assistant. For the user's query:" "${input.current.value}" ", suggest exactly 5 movie titles. Respond with only the titles, separated by commas, with no additional words or formatting.For Example respond:
Inception, The Matrix, Interstellar, Parasite, The Dark Knight`;
    dispach(showGptShimmer(true));
    try {
      const gptResult = await client.chatCompletion({
        model: selectedModel,
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
      setError("Failed to search movies Please try again later.");
    }
  };

  return (
    <div className="w-full md:w-[60%] mx-auto px-4">
      {/* Model Selector Dropdown UI */}
      <div className="flex justify-end mb-2 items-center">
        <label className="text-white text-xs mr-2 font-medium">
          AI Engine:
        </label>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="p-2 bg-gray-900 text-white rounded-md text-xs max-w-xs border border-gray-700 cursor-pointer outline-none hover:bg-gray-800 transition"
        >
          {Object.entries(models).map(([label, modelId]) => (
            <option key={modelId} value={modelId}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Original Movie Search Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black grid grid-cols-12 rounded-lg overflow-hidden border border-gray-800"
      >
        <input
          ref={input}
          className="p-4 bg-transparent text-white col-span-8 outline-none placeholder-gray-500"
          type="text"
          placeholder={lang[langugae].gptSearchPlaceholder}
        />
        <button
          onClick={heldleSearch}
          className="m-2 bg-red-600 text-white font-bold rounded-lg col-span-4 hover:bg-red-700 transition"
        >
          {lang[langugae].search}
        </button>
      </form>
    </div>
  );
};
