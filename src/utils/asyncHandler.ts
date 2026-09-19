import type { NextFunction, Request, RequestHandler, Response } from "express";

// Envuelve un handler async para que sus rechazos lleguen a next() y no se
// pierdan silenciosamente — Express 4 no hace esto solo.
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
