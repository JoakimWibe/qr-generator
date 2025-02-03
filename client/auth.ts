import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

interface BackendAuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    imageUrl: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: token.email,
              name: token.name,
              imageUrl: token.picture
            })
          });

          if (!response.ok) {
            throw new Error('Failed to authenticate with backend');
          }

          const data: BackendAuthResponse = await response.json();
          return {
            ...token,
            backendToken: data.token,
            userId: data.user.id
          }
        } catch (error) {
          console.error('Failed to authenticate with backend:', error)
          return token
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.backendToken && typeof token.backendToken === 'string') {
        session.token = token.backendToken;
      }
      if (token?.userId && typeof token.userId === 'string') {
        session.user.id = token.userId;
      }
      return session;
    },
  }
})