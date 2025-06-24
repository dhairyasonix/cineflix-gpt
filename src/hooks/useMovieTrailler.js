
import { API_OPtion } from "../utils/constants";
import { useEffect, useState } from "react";

const useMovieTrailer = (movieId) => {
    
    const [trailer,setTriler]=useState(null)

    // fetching trailler and updating a store vith trailler videro
    const getMovieVideo = async () => {
        try {
            const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos?", API_OPtion);
        const json = await data.json()

        const filterData = json?.results?.filter(video => video.type === "Trailer")
        const selectedTrailer = filterData?.length ? filterData[0] : json?.results[0]
        setTriler(selectedTrailer)
        } catch (error) {
            console.log("Faield to get trailer "+error.message)
        }
        

        
    }

    useEffect(() => {
         if (movieId)getMovieVideo();
    }, [movieId]);

    return trailer;
}

export default useMovieTrailer