'use client'
import { useSession, signIn } from "next-auth/react"
import { useRef } from "react";
import Image from "next/image";
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
      <div className="absolute left-0 top-0 w-full h-full backdrop-blur-sm"></div>
      <div className="absolute inset-0 flex justify-center items-center min-w-[300px] backdrop-blur-sm">
        
        <div className="relative flex flex-col items-center w-[275px] md:w-[325px] gap-2 bg-violet-500/90 rounded-lg p-6">
          <button onClick={hide} className="absolute top-2 right-2 w-8 h-8 text-center text-lg font-bold text-slate-100/90">x</button>
          <p className="absolute top-8 float-left w-4/6 min-w-[200px] font-bold text-xl font-jost size-1 text-center text-violet-50 mb-3">Sign in to continue</p>
          <br className="mb-14"/>
          <button className="w-48 h-16 hover:w-52 p-2 rounded-md bg-gradient-to-br from-slate-100 to-slate-100" onClick={() => signIn('google')}>
            <Image className="float-left" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="" width={24} height={24} />
            <p className="bg-gradient-to-r from-indigo-500 to-violet-500 text-transparent bg-clip-text font-jost subpixel-antialiased font-medium">Sign in with Google</p>
          </button>
          <button className="w-48 h-16 hover:w-52 p-2 rounded-md bg-gradient-to-br from-slate-100 to-slate-100" onClick={() => signIn('github')}>
            <Image className="float-left" src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" alt="" width={24} height={24} />
            <p className="float-right bg-gradient-to-r  from-indigo-500 to-violet-500 text-transparent bg-clip-text font-jost subpixel-antialiased font-medium">Sign in with GitHub</p>
          </button>
        </div>
      </div>
    </div>
    
  )

}
