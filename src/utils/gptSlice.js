import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        gptMoviesResult: null,
        moviesName: null,
        showShimmer:null,
    },
    reducers: {
        toggleGptSerch: (state, action) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult: (state, action) => {

            const { gptMovies, tmdbResults } = action.payload
            state.moviesName = gptMovies;
            state.gptMoviesResult = tmdbResults;
        },
        showGptShimmer:(state,action)=>{
            state.showShimmer = action.payload
        },
        
    },
});
export const { toggleGptSerch, addGptMovieResult,showGptShimmer } = gptSlice.actions
export default gptSlice.reducer