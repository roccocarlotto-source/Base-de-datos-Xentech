import type { NextFunction, Request, Response } from "express";
import { verifySupabaseJwt } from "../lib/jwt";
import { resolveAuthContext } from "../services/auth.service";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

const BEARER_PREFIX = "Bearer ";

// Verifica el JWT de Supabase y adjunta el AuthContext a req.auth. Solo
// prueba identidad — la autorización por rol/organización vive en cada
// route handler (mismo split que PlataformaCRM: authenticate.ts vs
// authorize.ts).
export const authenticate = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith(BEARER_PREFIX)) {
      throw new AppError("Falta el token de autenticación", 401);
    }

    const token = header.slice(BEARER_PREFIX.length).trim();
    if (!token) {
      throw new AppError("Falta el token de autenticación", 401);
    }

    const payload = await verifySupabaseJwt(token);
    req.auth = await resolveAuthContext(payload);

    next();
  },
);
