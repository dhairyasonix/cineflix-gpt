import { onAuthStateChanged, signOut } from 'firebase/auth';
import  { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANG } from '../utils/constants';
import { toggleGptSerch } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {

  const navigator = useNavigate()
  const user = useSelector((store) => store.user)
  const location = useLocation()
  const dispatch = useDispatch()
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)



  const handleSignout = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      console.log(error.message)
    });
  };



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) { // loged in

        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, displayName: displayName, email: email }));
        navigator("/brouse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigator("/");
      }
    });

    return () => unsubscribe();// unscribe when component unmount

  }, [dispatch, navigator]);

  const handleGptSearch = () => {
    dispatch(toggleGptSerch());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }


  return (
    <div className='absolute py-2 bg-gradient-to-b from-black z-10 flex  flex-col md:flex-row justify-between w-full '>
      
     <Link to="/"><img className=' z-40 w-48 md:mx-10 pt-2 md:px-6 py-2 md:py-8 mx-auto' src={LOGO} alt='logo'></img></Link> 

      {location.pathname === "/brouse" && user && <div className='flex px-4 mx-auto md:mx-0'>
        <h4 className={`${showGptSearch && "hidden md:block"} md:px-2 py-1 mx-1 md:my-10 font-bold text-white text-lg`}>Hi {user?.displayName}</h4>
        {showGptSearch && <select className='px-2 py-2 mx-2 md:my-10 bg-gray-700 text-white rounded-sm hover:bg-opacity-70' onClick={handleLanguageChange}>
          {SUPPORTED_LANG.map(lan => <option key={lan.identifier} value={lan.identifier}>{lan.name}</option>)}
        </select>}
        <button onClick={handleGptSearch} className='px-2 py-1 mx-2 md:my-10 bg-purple-600 text-white font-bold rounded-lg hover:bg-opacity-70'>{showGptSearch ? "Home" : "GPT Search"}</button>
        <button onClick={handleSignout} className=' px-2 py-1 mx-1 md:my-10 bg-red-600 text-white font-bold rounded-lg hover:bg-opacity-70'>Sign Out</button>
      </div>}


    </div>

  )
}

export default Header