import React from 'react'
import { useDispatch } from 'react-redux'
import { addPlayNow } from '../utils/movieSlice'

const VideoTitle = ({movie}) => {
  const dispatch = useDispatch()
const { title, overview } = movie
const handlePlay =()=>{

dispatch(addPlayNow(movie))

  }

  return (
    <div className='relative aspect-video h-screen w-full pt-[50%] md:pt-[16%] md:px-20 px-3 text-white  bg-gradient-to-t from-black '>
      <h1 className='text-xl md:text-4xl font-bold'>{title}</h1>
      <p className='pt-6 w-1/3 hidden md:inline-block'>{overview}</p>
      <div className='md:mt-4 mt-20'>
        <button className='bg-white text-black  px-4 md:py-2 py-1 rounded-sm hover:bg-opacity-60' onClick={handlePlay}>Play</button>
        <button className='bg-gray-500 text-white  px-4 md:py-2 py-1  mx-2 rounded-sm'>More Info</button>
      </div>

    </div>
  )
}

export default VideoTitle