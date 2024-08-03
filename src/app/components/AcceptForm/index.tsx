//@ts-nocheck
'use client'
import { useSession } from "next-auth/react"
import { useRef, useReducer } from "react";
//import { Backdrop } from "../Backdrop";
export default function AcceptForm({setRegistering}) {
    // rendering components for logged in users
    const tos = useRef<HTMLInputElement>(null);
    const privacy = useRef<HTMLInputElement>(null);
    const newsletter = useRef<HTMLInputElement>(null);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const { data: session } = useSession()

    async function register()
    {
        if(!tos.current || !privacy.current || !session) return;
        if(tos.current.checked && privacy.current.checked)
        {
            setRegistering(false);
            const user = {name: session?.user.name, email: session?.user?.email, newsletter: newsletter.current?.checked}
            const res = await fetch("/api/auth/register", {
                method: 'POST',
                body: JSON.stringify(user),
            });
        }
    }
    return (
    <div className="z-30">
        <div className="absolute left-0 top-0 w-full h-full backdrop-blur-sm"></div>
        <div className="absolute inset-0 flex justify-center items-center min-w-[300px] backdrop-blur-sm">
        <div className="relative flex flex-col items-center w-[275px] md:w-[325px] gap-2 bg-violet-500/90 rounded-lg p-6">
            <div className="flex">
                <p className="main-text">I have read and accepted the <a href={`${process.env.NEXTAUTH_URL}/tos`} target="_blank" className="text-slate-100 font-bold subpixel-antialiased">Terms of Service</a></p>
                <input type="checkbox" ref={tos} className="checkbox" onChange={forceUpdate}/>
            </div>
            <div className="flex">
                <p className="main-text">I have read and accepted the <a href={`${process.env.NEXTAUTH_URL}/privacy`} target="_blank" className="text-slate-100 font-bold subpixel-antialiased">Privacy Policy</a></p>
                <input type="checkbox" ref={privacy} className="checkbox" onChange={forceUpdate}/>
            </div>
            <div className="flex">
                <p className="text-slate-100/80">I would like to be the email newsletter</p>
                <input type="checkbox" ref={newsletter} className="checkbox"/>
            </div>
            {(tos.current && privacy.current && (!tos.current.checked || !privacy.current.checked)) &&
                <button className="rounded-md bg-slate-50/80 w-4/6 h-10 "><p className="main-text-dark">Continue</p></button>
            }
            {(tos.current && privacy.current && (tos.current.checked && privacy.current.checked)) &&
                <button className="rounded-md bg-slate-50 w-4/6 h-10 hover:w-9/12" onClick={register}><p className="main-text-dark">Continue</p></button>
            }
        </div>
        </div>
    </div>
)

}
