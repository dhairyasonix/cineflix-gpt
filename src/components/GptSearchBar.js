import  { useRef } from 'react'
import lang from '../utils/LanguageConstants'
import { useDispatch, useSelector } from 'react-redux'
import { InferenceClient } from "@huggingface/inference";
import { API_OPtion, GPT_KEY } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

// import { generateText } from './deepaiService'

// import { genrateMovies } from './deepaiService'

export const GptSearchBar = () => {
  const dispach = useDispatch()
  const langugae = useSelector(store => store.config.lan)

  const input = useRef(null);
  const client = new InferenceClient(GPT_KEY);
  //search move tmdb
  const searchMovieTmdb = async (movie) => {
    try {
      const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPtion);

    const json = await data.json()
    return json?.results;
    } catch (error) {
      console.log("Faield to ge gpt tmdb movie search "+error.message)
    }
    
  }


  const heldleSearch = async () => {
    const gptQuery = "Act as a movie recomndation system and suggest some movies for the query : " + input.current.value + " only give me names of 5 movies by comma seprated. for Example Result:, Gadar, Sholay, Star Wars, Goalmaal, Godfather";
    const gptResult = await client.chatCompletion({
    provider: "nscale",
    model: "meta-llama/Llama-3.1-8B-Instruct",
    messages: [
        {
          role: "user",
          content: gptQuery
        }
      ],
      
    });

    const gptMovies = gptResult?.choices[0]?.message?.content.split(",")
    
    console.log(gptResult?.choices[0]?.message?.content)
    // for each movie will serch tmdb api
    const prommiseArray = gptMovies?.map(movie => searchMovieTmdb(movie));
    const tmdbResults = await Promise.all(prommiseArray);
   
    dispach(addGptMovieResult({ gptMovies: gptMovies, tmdbResults }))
  }

  return (
    <div className='md:w-[50%] mx-auto'>
      <form onSubmit={(e) => e.preventDefault()} className=' bg-black grid grid-cols-12'>
        <input ref={input} className='p-4 m-4 col-span-8 rounded-lg' type='text' placeholder={lang[langugae].gptSearchPlaceholder} />
        <button onClick={heldleSearch} className='p-4 mr-4 my-4 bg-red-600 text-white rounded-lg col-span-4'>{lang[langugae].search}</button>
      </form>
    </div>
  )
}
