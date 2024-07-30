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
        if(dbUser)
        {
            return NextResponse.json({...dbUser})
        }
        return NextResponse.json({message: "User not found"}, {status: 500});
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