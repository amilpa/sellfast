
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  callbacks: {
    async signIn(data) {
      const res = await fetch(`${process.env.API_URL}/api/user/register`, {
        method: "POST",
        body: JSON.stringify(data.user)
      })
      // console.log(data.user)
      // console.log(res.status)
      return true;
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }