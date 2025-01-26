import { User as ClerkUser } from '@clerk/nextjs';

declare module '@clerk/nextjs' {
  export interface User {
    id: string;
    emailAddresses: { emailAddress: string }[];
    firstName: string;
    lastName: string;
  }
}
