"use client";

import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useAuth } from "./../../context/AuthContext";

const LoginPage = () => {
  const googleAuth = new GoogleAuthProvider();
  const [signIn, setSignIn] = useState(false);
  const [user, setUser] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [displayName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");

  const { open, setOpen } = useAuth();

  const loginGoogle = async () => {
    const result = await signInWithPopup(auth, googleAuth);
    setOpen(false);
  };

  const loginFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setOpen(false);
  };

  const register = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      displayName
    );
    setEmail("");
    setPassword("");
    setName("");
  };

  const login = async (e) => {
    e.preventDefault();
    const user = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    setLoginEmail("");
    setLoginPassword("");
    setOpen(false);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen gap-5 text-white transition bg-black ease">
        <div className="min-h-[390px] md:min-w-[400px] w-[300px] transition  p-5 rounded-md">
          {signIn ? (
            <form onSubmit={register} className="flex flex-col gap-2 w-42">
              <h1 className="text-3xl font-bold text-blue-500">Register</h1>
              {error && (
                <div className="w-full font-semibold text-center text-red-500 border-2 border-red-500 rounded-md">
                  {error}
                </div>
              )}
              <input
                className="px-2 py-3 bg-gray-700 rounded-md"
                type="text"
                placeholder="Name"
                value={displayName}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="px-2 py-3 bg-gray-700 rounded-md"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="px-2 py-3 bg-gray-700 rounded-md"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="mt-3 w-full max-w-[40ch] border-2 rounded-md border-blue-500 border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-blue-500 after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300  font-bold text-blue-500 hover:text-white ">
                <h2 className="relative z-20">Sign Up</h2>
              </button>
            </form>
          ) : (
            <form onSubmit={login} className="flex flex-col gap-1 w-42">
              <h1 className="text-3xl font-bold text-blue-500">Login</h1>
              <input
                className="px-2 py-3 bg-gray-700 rounded-md"
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                className="px-2 py-3 bg-gray-700 rounded-md"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button className="mt-3 w-full max-w-[40ch] border-2 rounded-md border-blue-500 border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-blue-500 after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300  font-bold text-blue-500 hover:text-white ">
                <h2 className="relative z-20">Sign In</h2>
              </button>
            </form>
          )}

          <div className="flex flex-col w-full gap-2 mt-[2%]">
            <div
              onClick={loginGoogle}
              className="text-center w-full max-w-[40ch] border-2 rounded-md border-blue-500 border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-blue-500 after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300  font-bold text-blue-500 hover:text-white "
            >
              <h2 className="relative z-20">Sign in with Google</h2>
            </div>
            <div
              onClick={loginFacebook}
              className="text-center w-full max-w-[40ch] border-2 rounded-md border-blue-500 border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-blue-500 after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300  font-bold text-blue-500 hover:text-white "
            >
              <h2 className="relative z-20">Sign in with Facebook</h2>
            </div>
          </div>
          <div>
            <h1
              className="mt-1 font-medium text-center text-gray-500 cursor-pointer"
              onClick={() => setSignIn(!signIn)}
            >
              {signIn
                ? "Don't have a account? Register"
                : "Have a account? Login"}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
