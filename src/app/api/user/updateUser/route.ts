//@ts-nocheck
import prisma from "../../../../../prisma";
import { connectToDatabase } from "@/app/helpers/server-helpers";
import { NextResponse } from "next/server";
export async function POST(req: Request)
{
    try
    {
        const {email, name} = await req.json();
        connectToDatabase();
        var dbUser = await prisma.user.findFirst({ where: { email: email}})
        if(!dbUser) // Add user to db if it doesn't exist
        {
            const user = {name: name, email: email}
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/register`, {
                method: 'POST',
                body: JSON.stringify(user),
            });
            dbUser = res.json()

        }
        else if(dbUser.lastTokens + parseInt(process.env.TOKEN_RESET_INTERVAL_MS) < Date.now())
        {
            dbUser.tokens = parseInt(process.env.WEEKLY_TOKENS);
            dbUser.lastTokens = Date.now();
            dbUser = await prisma.user.update({
                where: {email: email},
                data: {tokens: 10, lastTokens: Date.now()}
            })
        }
        return NextResponse.json({dbUser}, {status: 200});
    }
    catch (error)
    {
        console.log(error);
        return NextResponse.json({message: "Server Error"}, {status: 500});
    }
    finally
    {
        await prisma.$disconnect();
    }
}