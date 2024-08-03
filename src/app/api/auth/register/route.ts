//@ts-nocheck
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/helpers/server-helpers";
import prisma from "../../../../../prisma";
import bcrypt from 'bcrypt';

export async function POST(req: Request)
{
    try
    {
        const request = await req.json();
        if(!request.name || !request.email || request.newsletter == null) return NextResponse.json({message: "Invalid data"}, {status: 422});
        await connectToDatabase();
        var userData = {email: request.email, name: request.name, tokens: parseInt(process.env.WEEKLY_TOKENS), lastTokens: Date.now(), newsletter: request.newsletter};
        if(await prisma.user.findFirst({ where: { email: request.email}})) return NextResponse.json({message: "User already registered"}, {status: 200});
        if(request.password)
        {
            const hashedPassword = await bcrypt.hash(request.password, 10);
            userData = {email: request.email, name: request.name, hashedPassword: hashedPassword, tokens: parseInt(process.env.WEEKLY_TOKENS), lastTokens: Date.now(), newsletter: true};
        }

        const user = await prisma.user.create({data: userData});
        return NextResponse.json({user}, {status:201})
    }
    catch (error)
    {
        console.log(error);
        return NextResponse.json({message: "Server Error"}, {status:500})
    }
    finally
    {
        await prisma.$disconnect();
    }
}