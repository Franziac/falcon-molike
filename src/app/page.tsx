'use client'
import { useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Generator from "./components/Generator/Generator";
import DynamicTitle from "./components/DynamicTitle";
import SignInForm from './components/SignInForm';

export default function Home() {
  const signInForm = useRef(null);
  // extracting data from usesession as session
  const { data: session } = useSession()
  function getStarted()
  {
    if(!session && signInForm.current != null) signInForm.current.style.display = "block";
  }
  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    return (
      <main className="min-h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-slate-100 to-indigo-100">
        <button className="float-right relative top-2 right-5" onClick={() => signOut()}>Sign out</button>
        <div className="mt-10">
          <div className='h-48 w-full flex items-center justify-center'>
            <div className="w-730">
              <DynamicTitle/>
            </div>
          </div>

          <div className="flex justify-center content-center mt-16 mb-16">
            <Generator/>
          </div>
          <br></br>
        </div>

        <div className="justify-center content-center mt-4 mb-2">
          <p className="inset-x-0 text-center text-gray-400 font-jost">Powered by Falcon</p>
          <p className="inset-x-0 text-center text-gray-400 font-jost">Made by Frans Järvi</p>
        </div>
      </main>
    )
  }

  // rendering components for not logged in users
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-slate-100 to-indigo-100">
        <button className="float-right relative top-2 right-5 text-gray-400 font-jost" onClick={() => signIn('google')}>Sign In</button>
        <div  className="mt-10">
          <div className='h-48 w-full flex items-center justify-center'>
            <div className="w-730">
              <DynamicTitle/>
            </div>
          </div>

          <div className="flex h-10 justify-center">
            <button onClick={getStarted} className="w-36 rounded-md bg-gradient-to-br from-purple-500 bg-violet-600">
              <p className="bg-gradient-to-r from-white to-slate-100 text-transparent bg-clip-text font-jost subpixel-antialiase font-medium">Get Started</p>
            </button>

          </div>
          <br></br>
        </div>
        
        <div ref={signInForm} className="hidden">
          <SignInForm />
        </div>


        <div className="justify-center content-center mt-4 mb-2">
          <p className="inset-x-0 text-center text-gray-400 font-jost">Powered by Falcon</p>
          <p className="inset-x-0 text-center text-gray-400 font-jost">Made by Frans Järvi</p>
        </div>
      </main>
  )

}
