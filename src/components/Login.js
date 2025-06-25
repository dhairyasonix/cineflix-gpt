import React, { useRef, useState } from "react";
import Header from "./Header";
import { cheackValidation } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND } from "../utils/constants";

const Login = () => {
  const [issignInForm, setissignInForm] = useState(true);
  const [errormessage, seterrormessage] = useState(null);

  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButton = () => {
    const message = cheackValidation(
      email?.current?.value,
      password?.current?.value
    );
    seterrormessage(message);

    if (message) return; // retun if error

    if (!issignInForm) {
      //sign up

      createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name?.current?.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, displayName: displayName, email: email })
              );
            })
            .catch((error) => {
              // An error occurred
              const errorMessage = error.message;
              seterrormessage(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrormessage(errorMessage + "-" + errorCode);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed in
          //   const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrormessage(errorMessage + "-" + errorCode);
        });
    }
  };

  const toggleSignIn = () => {
    setissignInForm(!issignInForm);
  };

  return (
    <div>
      <div className="relative z-10 m-auto">
        {" "}
        <Header />
      </div>
      <div>
        <img
          className="absolute h-screen object-cover md:w-full brightness-[60%]"
          src={BACKGROUND}
          alt="loginBg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="px-14 my-36 mx-auto md:w-3/12 left-0 right-0 absolute bg-black text-white rounded-lg bg-opacity-80"
      >
        <h1 className="py-6  text-2xl font-bold">
          {issignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!issignInForm && (
          <input
            ref={name}
            className="p-4 my-4 w-full bg-gray-800"
            type="text"
            placeholder="Full Name"
          />
        )}

        <input
          ref={email}
          className="p-4 my-4 w-full bg-gray-800"
          type="text"
          placeholder="Email Address"
        />

        <input
          ref={password}
          className="p-4 my-2  w-full bg-gray-800"
          type="password"
          placeholder="Password"
        />

        <p className="font-bold text-red-500 text-lg  my-2">{errormessage}</p>

        <button
          className="p-4 mt-6  w-full bg-red-600 rounded-lg "
          onClick={handleButton}
        >
          {issignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className=" my-4 cursor-pointer" onClick={toggleSignIn}>
          {issignInForm
            ? "New to Cineflix? Sign up now."
            : "Already a Member? Sign in now"}
        </p>

        <p className="text-xs m-1 p-2 text-red-600">
          {" "}
          This is a personal project. No user information is stored or shared!
        </p>
      </form>
    </div>
  );
};

export default Login;
