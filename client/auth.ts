import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"

interface BackendToken {
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
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: token.email,
              name: token.name,
              imageUrl: token.picture
            }),
          })

          if (!response.ok) {
            throw new Error('Failed to authenticate with backend')
          }

          const backendToken: BackendToken = await response.json()
          
          return {
            ...token,
            backendToken: backendToken.token,
            backendUser: backendToken.user
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return token
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token.backendToken) {
        session.backendToken = token.backendToken as string
        session.user.id = (token.backendUser as any).id
      }
      return session
    },
  }
})