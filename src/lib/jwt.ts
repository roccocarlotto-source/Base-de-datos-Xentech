import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

// Verificación de JWT de Supabase vía JWKS (ES256) — mismo mecanismo que
// PlataformaCRM (docs/authentication-architecture.md de ese repo). Requiere
// SUPABASE_JWKS_URL una vez que exista el proyecto real de Supabase; hasta
// entonces esta función lanza en el primer uso, no en el arranque del
// servidor (createRemoteJWKSet es lazy).
let jwks: ReturnType<typeof createRemoteJWKSet> | undefined;

function getJwks() {
  if (!jwks) {
    const url = process.env.SUPABASE_JWKS_URL;
    if (!url) {
      throw new Error("Falta SUPABASE_JWKS_URL en el entorno");
    }
    jwks = createRemoteJWKSet(new URL(url));
  }
  return jwks;
}

export async function verifySupabaseJwt(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, getJwks());
  return payload;
}
