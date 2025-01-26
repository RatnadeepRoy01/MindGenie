declare namespace NodeJS {
    interface ProcessEnv {
      CLERK_API_KEY: string;
      NEXT_PUBLIC_CLERK_FRONTEND_API: string;
      DATABASE_URL: string;
    }
  }
  