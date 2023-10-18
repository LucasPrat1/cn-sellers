import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Email',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CN_API_URL}/sellers/login`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        });
        const res = await response.json();

        if (response.ok && !res.error && res.data) {
          return res.data
        }

        if (res.error) { throw res }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
})

export { handler as GET, handler as POST }