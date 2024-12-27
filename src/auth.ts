
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 import toast from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
})

