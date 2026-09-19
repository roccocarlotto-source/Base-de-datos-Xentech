export interface AuthContext {
  userId: string;
  organizationId: string;
  role: "ADMIN" | "MEMBER";
  isPlatformAdmin: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}

export {};
