// imports
import NextAuth from "next-auth"

// importing providers
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma";
import bcrypt from 'bcrypt';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Sign In",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com"
                },
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                if(!credentials || !credentials.email || !credentials.password) return null;
                const dbUser = await prisma.user.findFirst({ where: { email: credentials.email}})
                if (dbUser && dbUser.hashedPassword == await bcrypt.hash(credentials.password, 10)) {
                    const { hashedPassword, ...dbuserWithoutPassword} = dbUser;
                  // Any object returned will be saved in `user` property of the JWT
                    return dbuserWithoutPassword;
                } else {
                  // If you return null then an error will be displayed advising the user to check their details.
                    return null
                  // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          })
    ]
})

export { handler as GET, handler as POST }