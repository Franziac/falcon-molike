//@ts-nocheck
import prisma from "@/app/prisma";
import { connectToDatabase } from "@/app/helpers/server-helpers";
import { NextResponse } from "next/server";
export async function POST(req: Request)
{
    try
    {
        const {email} = await req.json();
        connectToDatabase();
        var dbUser = await prisma.user.findFirst({ where: { email: email}})
        if(!dbUser) return NextResponse.json({message: "User not found"}, {status: 500});
        if(dbUser?.tokens > 0)
        {
            dbUser.tokens -= 1;
            dbUser = await prisma.user.update({
                where: {email: email},
                data: {tokens: dbUser.tokens, lastTokens: Date.now()}
            })
            return NextResponse.json({dbUser}, {status: 200});
        }
        else
        {
            return NextResponse.json({message: "Not enough tokens"}, {status: 403});
        }
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