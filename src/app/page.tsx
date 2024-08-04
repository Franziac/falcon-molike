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
  const [isAccepting, setAccepting] = useState<boolean>(false);

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

          {(isRegistering && !isAccepting)
            ? <AcceptForm setAccepting={setAccepting}/>
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
          <div className="flex justify-center mt-28">
            <div className="flex flex-col backdrop-blur-md bg-gradient-to-br from-white/10 to-white/10 title-shadow p-6 rounded-lg w-2/3 h-fit min-w-[300px] mb-8">
              <h1 className="float-left text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-500 to-indigo-500 bg-clip-text text-transparent">Molike&nbsp;&nbsp;&mdash;&nbsp;&nbsp;Discover More of What You Like</h1>
              <p className="font-main md:text-lg text-indigo-600">We&apos;ve all been there&mdash;you just finished an incredible movie or binged through an amazing TV series, and now you&apos;re left with that lingering <b>feeling of wanting more</b>. But not just more of <b>anything</b>; you want more of that <b><em>something</em></b>. That particular vibe, that genre, that storytelling style that resonated with you so deeply.</p>
              <p className="mt-3 font-main md:text-lg text-indigo-600">You <b>scroll endlessly</b> through streaming platforms, hoping to stumble upon something that <b>hits the same notes</b>, but nothing quite fits. You might find yourself re-watching the same scenes or episodes, wishing there was an easier way to find something <b>just like it&mdash;but different enough to keep things fresh</b>.</p>
              <p className="mt-3 font-main md:text-lg text-indigo-600">That&apos;s where Molike comes in. Molike is your personal guide to <b>discovering more of what you love</b>. Whether it&apos;s the suspense of a thriller, the charm of a rom-com, or the depth of a thought-provoking drama, Molike <b>understands your taste </b> and <b>delivers recommendations that feel just right</b>. It&rsquo;s not about finding an exact copy; it&rsquo;s about finding the <b>perfect next watch</b> that captures the essence of what you enjoyed.</p>
              <p className="mt-3 font-main md:text-lg text-indigo-600">With Molike, <b>you no longer have to settle for less when you crave more</b>. Our smart recommendations bring you closer to your next favorite movie or show, so you can dive back into that world you loved, without the endless search.</p>
            </div>
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
