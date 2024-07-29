'use client'
import { useSession, signIn } from "next-auth/react"
import { useRef } from "react";
//import { Backdrop } from "../Backdrop";
export default function SignInForm() {
  // rendering components for logged in users
  const signInForm = useRef<HTMLDivElement>(null);
  function hide()
  {
    if(signInForm.current && signInForm.current.parentElement) signInForm.current.parentElement.style.display = "none";
  }
  return (
    <div ref={signInForm}>
      <div className="absolute left-0 top-0 w-full h-full backdrop-blur-md"></div>
      <div className="absolute inset-0 flex justify-center items-center min-w-[300px]">
        <div className="relative flex flex-col items-center w-1/4 min-w-[275px] gap-2 bg-white rounded-lg p-6">
          <button onClick={hide} className="absolute top-2 right-2 w-8 h-8 text-center text-lg">x</button>
          <p className="absolute top-8 float-left w-4/6 min-w-[200px] font-jost size-1 text-center">Sign in to continue</p>
          <br className="mb-14"/>
          <button className="w-44 h-16 rounded-md bg-gradient-to-br from-purple-500 to-violet-600" onClick={() => signIn('google')}>
            <p className="bg-gradient-to-r from-white to-slate-100 text-transparent bg-clip-text font-jost subpixel-antialiased font-medium">Sign in with Google</p>
          </button>
          <button className="w-44 h-16 rounded-md bg-gradient-to-br from-purple-500 to-violet-600" onClick={() => signIn('github')}>
            <p className="bg-gradient-to-r from-white to-slate-100 text-transparent bg-clip-text font-jost subpixel-antialiased font-medium">Sign in with GitHub</p>
          </button>
        </div>
      </div>
    </div>
    
  )

}
