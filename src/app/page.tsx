'use client'
import { useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Generator from "./components/Generator";
import DynamicTitle  from "./components/DynamicTitle";
import SignInForm from './components/SignInForm';
import AnimationCanvas from "./components/AnimationCanvas";
import { ScheduleEvent } from './components/DynamicTitle/ScheduleEvent';
import { connectToDatabase } from "./helpers/server-helpers";



export default function Home() {
  const signInForm = useRef<HTMLDivElement>(null);
  // extracting data from usesession as session
  const { data: session } = useSession()
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
  }
  // checking if sessions exists
  if (session) {
    updateUserDb();
    // rendering components for logged in users
    return (
      <main className="absolute min-h-full w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full min-h-full -z-20 bg-gradient-to-b from-indigo-100 to-violet-100"></div>
        <div className="absolute top-0 left-0 h-80 w-full min-h-full -z-10">
          <AnimationCanvas/>
        </div>
        <button className="float-right relative top-2 right-5 text-slate-400/80" onClick={() => signOut()}>Sign out</button>
        <div className="mt-10">
          <div className='h-48 w-full flex items-center justify-center'>
            <div className="w-730">
              <DynamicTitle schedule={[new ScheduleEvent("1", 500), new ScheduleEvent(`{centered}Welcome ${session.user?.name}`, 2000), new ScheduleEvent("", 500), new ScheduleEvent("Want to watch something like {options}Interstellar*;*Fight Club*;*About Time*;*Your Name*;*Goodfellas*;*La La Land*;*Toy Story 3*;*Taxi Driver*;*The Aviator*;*The Martian{end-options}", -1)]}/>
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
    <main className="absolute min-h-full w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full min-h-full -z-20 bg-gradient-to-b from-indigo-100 to-violet-100"></div>
        <div className="absolute top-0 left-0 h-80 w-full min-h-full -z-10">
          <AnimationCanvas/>
        </div>
        <button className="float-right relative top-2 right-5 text-gray-400 font-jost" onClick={() => signIn('google')}>Sign In</button>
        <div  className="mt-10">
          <div className='h-48 w-full flex items-center justify-center'>
            <div className="w-730">
              <DynamicTitle schedule={[new ScheduleEvent("2", 500), new ScheduleEvent("{centered}Welcome", 2000), new ScheduleEvent("", 500), new ScheduleEvent("Want to watch something like {options}Interstellar*;*Fight Club*;*About Time*;*Your Name*;*Goodfellas*;*La La Land*;*Toy Story 3*;*Taxi Driver*;*The Aviator*;*The Martian{end-options}", -1)]}/>
            </div>
          </div>

          <div className="flex h-10 justify-center">
            <button onClick={getStarted} className="w-36 rounded-md bg-gradient-to-br from-purple-500 to-violet-600">
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
