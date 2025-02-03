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
  debug: true, // Enable NextAuth debugging
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
    async signIn({ user, account }) {
      console.log('SignIn callback:', { 
        provider: account?.provider,
        email: user?.email 
      });
      return true;
    },
    async jwt({ token, account, trigger }) {
      console.log('JWT callback triggered:', { 
        trigger,
        isFirstTime: !!account,
        email: token.email 
      });

      // Only make the login request on initial sign in
      if (account) {
        try {
          console.log('Making backend login request...');
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
          console.log('Backend login successful');
          
          // Store these explicitly
          token.backendToken = data.token;
          token.userId = data.user.id;
        } catch (error) {
          console.error('Failed to authenticate with backend:', error)
        }
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback:', {
        hasBackendToken: !!token.backendToken,
        hasUserId: !!token.userId
      });
      
      // Use the explicitly stored values
      session.token = token.backendToken as string;
      session.user.id = token.userId as string;
      
      return session;
    },
  }
})