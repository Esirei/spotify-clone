import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & Pick<JWT, 'username' | 'accessToken' | 'refreshToken'>;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    username: string;
    accessTokenExpiresAt: number;
  }
}
