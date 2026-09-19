import { PrismaClient } from "@prisma/client";

// Instancia única del cliente Prisma para todo el proceso (evita agotar el
// pool de conexiones con una instancia por request).
export const prisma = new PrismaClient();
