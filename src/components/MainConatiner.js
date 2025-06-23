import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'

const MainConatiner = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if (!movies) return;
    const {
        original_title, overview, id
    } = movies[1];



    return (
        <div className=''>

            <VideoBackground movieId={id} />
            <VideoTitle title={original_title} overview={overview} />

        </div>
    )
}

export default MainConatiner