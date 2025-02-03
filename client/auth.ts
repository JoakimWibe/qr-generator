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

const isProduction = process.env.NODE_ENV === 'production'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  cookies: {
    sessionToken: {
      name: isProduction ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProduction
      }
    }
  },
  callbacks: {
    async jwt({ token, account }) {
      console.log('JWT Callback - Token before:', { 
        hasToken: !!token.token,
        tokenKeys: Object.keys(token)
      });

      if (account) {
        try {
          const loginUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/login`;
          console.log('Attempting login:', loginUrl);
          
          const response = await fetch(loginUrl, {
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
            console.error('Login response not OK:', response.status);
            throw new Error('Failed to authenticate with backend');
          }

          const data: BackendAuthResponse = await response.json();
          console.log('Backend auth successful:', { 
            hasBackendToken: !!data.token,
            userId: data.user.id 
          });
          
          token.token = data.token;
          token.id = data.user.id;
        } catch (error) {
          console.error('Failed to authenticate with backend:', error)
        }
      }

      console.log('JWT Callback - Token after:', { 
        hasToken: !!token.token,
        tokenKeys: Object.keys(token)
      });

      return token
    },
    async session({ session, token }) {
      console.log('Session Callback:', { 
        hasInputToken: !!token.token,
        tokenKeys: Object.keys(token),
        sessionKeys: Object.keys(session)
      });

      session.token = token.token as string;
      session.user.id = token.id as string;

      console.log('Session after update:', { 
        hasToken: !!session.token,
        userId: session.user.id
      });

      return session
    },
  }
})