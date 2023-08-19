import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";



const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],


    callbacks: {
        async signIn({ profile }) {
            console.log("JUST SIGNED IN USING GOOGLE")
            try {
                await connectToDB()

                // Check if the user already exist
                const userExists = await User.findOne({
                    email: profile.email
                })


                // If not create a user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }


                return true;

            } catch (error) {
                console.log(error)
                return false
            }

        },
        async session({ session }) {
            console.log("JUST STARTED/CREATED A SESSION")
            const sessionUser = await User.findOne({
                email: session.user.email
            });
            session.user.id = sessionUser._id.toString();
            return session;

        }
    }
})


export { handler as GET, handler as POST };