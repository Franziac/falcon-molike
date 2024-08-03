//@ts-nocheck
'use client'
import { useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Generator from "./components/Generator";
import DynamicTitle  from "./components/DynamicTitle";
import SignInForm from './components/SignInForm';
import AnimationCanvas from "./components/AnimationCanvas";
import { ScheduleEvent } from './components/DynamicTitle/ScheduleEvent';
import { connectToDatabase } from "./helpers/server-helpers";
import AcceptForm from "./components/AcceptForm";



export default function Home() {
  const signInForm = useRef<HTMLDivElement>(null);
  // extracting data from usesession as session
  const { data: session } = useSession()
  const [isRegistering, setRegistering] = useState<boolean>(false);
  function getStarted()
  {
    if(!session && signInForm.current != null) signInForm.current.style.display = "block";
  }
  async function updateUserDb()
  {
    const res = await fetch("api/user/updateUser", {
      method: 'POST',
      body: JSON.stringify({name: session?.user?.name, email: session?.user?.email}),
    });
    const data = await res.json();
    if(data.message && data.message == "Not registered") setRegistering(true);
    else setRegistering(false);
  }
  // checking if sessions exists
  if (session) {
    updateUserDb();
    // rendering components for logged in users
    return (
      <main className="">
      <div className="background"></div>
      <div className="animationCanvas">
        <AnimationCanvas/>
      </div>
      
      <div className="content">
        <button className="float-right relative top-2 right-5 text-slate-400/80" onClick={() => signOut()}>Sign out</button>
        <div className="mt-10">
          <div className='h-48 w-full flex items-center justify-center'>
            <div className="w-730 ml-2 mr-1">
              <DynamicTitle schedule={[new ScheduleEvent("1", 500), new ScheduleEvent(`{centered}Welcome ${session.user?.name?.split(" ")[0]}`, 2000), new ScheduleEvent("", 500), new ScheduleEvent("Want to watch something like {options}Interstellar*;*Fight Club*;*About Time*;*Your Name*;*Goodfellas*;*La La Land*;*Toy Story 3*;*Taxi Driver*;*The Aviator*;*The Martian{end-options}", -1)]}/>
            </div>
          </div>

          {isRegistering
            ? <AcceptForm setRegistering={setRegistering}/>
            : <div className="flex justify-center content-center mt-16 mb-16">
                <Generator/>
              </div>
          }
          <br></br>
        </div>

        <div className="justify-center content-center mt-4 mb-2">
          <p className="inset-x-0 text-center text-gray-400 ">Powered by Falcon</p>
          <p className="inset-x-0 text-center text-gray-400 ">Made by Frans Järvi</p>
        </div>     
        </div>
      </main>
    )
  }

  // rendering components for not logged in users
  return (
    <main className="">
      <div className="background"></div>
      <div className="animationCanvas">
        <AnimationCanvas/>
      </div>
      
      <div className="content">
        <button className="float-right relative top-2 right-5 text-gray-400 font-main" onClick={() => signIn('google')}>Sign In</button>
        <div  className="mt-10">
          <div className='h-48 w-full flex items-center justify-center'>
            <div className="w-730 ml-2 mr-1">
              <DynamicTitle schedule={[new ScheduleEvent("2", 500), new ScheduleEvent("{centered}Welcome", 2000), new ScheduleEvent("", 500), new ScheduleEvent("Want to watch something like {options}Interstellar*;*Fight Club*;*About Time*;*Your Name*;*Goodfellas*;*La La Land*;*Toy Story 3*;*Taxi Driver*;*The Aviator*;*The Martian{end-options}", -1)]}/>
            </div>
          </div>

          <div className="flex h-10 justify-center">
            <button onClick={getStarted} className="w-36 rounded-md bg-gradient-to-br main-color-bg  relative hover:w-[10rem] hover:shadow-md shadow-purple-500">
              <p className="main-text">Get Started</p>
            </button>

          </div>
        </div>
        <div ref={signInForm} className="hidden">
          <SignInForm />
        </div>


        <div className="justify-center content-center mt-4 mb-2">
          <p className="inset-x-0 text-center text-gray-400 ">Powered by Falcon</p>
          <p className="inset-x-0 text-center text-gray-400 ">Made by Frans Järvi</p>
        </div>

      </div>

    </main>
  )

}
