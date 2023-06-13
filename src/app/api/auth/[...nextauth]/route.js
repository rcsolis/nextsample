
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";
import User from "@models/User";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({session}){
            try{
                const user = await User.findOne({email: session.user.email});
                session.user.id = user._id.toString();
                return session;
            }catch(err){
                console.log("Error getting session: ", err);
                return null;
            }
        },
        async signIn({profile}){
            try{
                await connectToDatabase();
                // Check if user exits in database
                const userExists = await User.findOne({email: profile.email});
                // If not, create user
                if(!userExists){
                    const userName = new String(profile.name);
                    await User.create({
                        name: userName.trim().toLocaleLowerCase().replace(/\s+/g, ""),
                        email: profile.email,
                        image: profile.picture,
                    });
                }
                return true;
            }catch(err){
                console.log("Error signing in: ", err);
                return false;
            }
        }
    },
});

export { handler as GET, handler as POST };