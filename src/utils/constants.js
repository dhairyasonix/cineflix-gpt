
import bG_IMG from "../utils/Images/BG_IMG.webp"
export const LOGO = "https://fontmeme.com/permalink/240222/bcdb91e51f3c28e0157e790186fff21d.png"


export const USER_ICON = "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"

export const BACKGROUND = bG_IMG


export const API_OPtion = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_KEY,
  }
};


export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const SUPPORTED_LANG = [{
  identifier: "en", name: "English"
},
{
  identifier: "hindi", name: "Hindi"
},
{
  identifier: "spanish", name: "Spanish"
},
];



export const GPT_KEY = "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";
