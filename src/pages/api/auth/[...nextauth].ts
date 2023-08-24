import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // Fix the typo here
import NextAuth from 'next-auth/next'
import { signIn } from "@/lib/firebase/service";
import { compare } from "bcrypt";
const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({ 
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },

            },
            async authorize(credentials) {
                const { email, password} = credentials as {
                    email: string,
                    password: string,
                    
                };
                const user:any = await signIn({email})
                if(user){
                    const passwordConfirm = await compare(password, user.password)
                    if(passwordConfirm){
                        return user
                    }
                    else{
                        return null
                    }      }
                else{
                    return null
                }
            }
        })
    ],
    callbacks:{
        jwt({token, account, profile, user}){
            if(account?.provider === "credentials"){
                token.email = user.email
                token.name = user.name
            }

            return token
        },
        async session({ session, token }:any){
            if ("email" in token){
                session.user.email = token.email
            }
            if ("name" in token){
                session.user.name = token.name
            }

            return session
        }
    },
    pages:{
        signIn: '/signin'
    }
};

export default NextAuth(authOptions)