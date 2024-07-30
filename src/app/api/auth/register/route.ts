//@ts-nocheck
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/helpers/server-helpers";
import prisma from "@/app/prisma";
import bcrypt from 'bcrypt';

export async function POST(req: Request)
{
    try
    {
        const request = await req.json();
        if(!request.name || !request.email) return NextResponse.json({message: "Invalid data"}, {status: 422});
        await connectToDatabase();
        var userData =
        {
            name: request.name,
            email: request.email,
        }
        if(request.password)
        {
            const hashedPassword = await bcrypt.hash(request.password, 10);
            userData = {email: request.email, name: request.name, hashedPassword: hashedPassword};
        }

        const user = await prisma.user.create({data: userData});
        return Response.json({user}, {status:201})
    }
    catch (error)
    {
        console.log(error);
        return Response.json({message: "Server Error"}, {status:500})
    }
    finally
    {
        await prisma.$disconnect();
    }
}