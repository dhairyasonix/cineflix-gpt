import React from 'react'
import { GptSearchBar } from './GptSearchBar'
import GptSearchSuggestion from './GptSearchSuggestion'
import { BACKGROUND } from '../utils/constants'

const GptSerchPage = () => {
  return (
    <div>
      <div>
        <img className="fixed -z-10 h-screen md:w-screen object-cover brightness-[60%]" src={BACKGROUND} alt='loginBg' />
      </div>
      <div className='md:pt-[10%] pt-[60%] '>
        <GptSearchBar />
        <GptSearchSuggestion />
      </div>
    </div>
  )
}

export default GptSerchPage