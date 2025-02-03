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
  callbacks: {
    async jwt({ token, account }) {
      console.log('JWT Callback - Initial token:', token); // Debug initial token
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
            console.error('Backend auth failed:', await response.text()); // Debug backend response
            throw new Error('Failed to authenticate with backend');
          }

          const data: BackendAuthResponse = await response.json();
          console.log('Backend auth response:', data); // Debug backend data
          token.token = data.token;
          token.id = data.user.id;
        } catch (error) {
          console.error('Failed to authenticate with backend:', error)
        }
      }
      console.log('JWT Callback - Final token:', token); // Debug final token
      return token
    },
    async session({ session, token }) {
      session.token = token.token as string
      session.user.id = token.id as string
      return session
    },
  }
})