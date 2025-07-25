import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const VALID_TOKENS = process.env.STATIC_TOKENS?.split(",") || [];

export const authenticateStaticToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log("TOKENS:", VALID_TOKENS);

  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Kein oder ungültiger Authorization Header" });
  }

  const token = authHeader.split(" ")[1];

  if (!VALID_TOKENS.includes(token)) {
    return res
      .status(403)
      .json({ message: "Zugriff verweigert – ungültiger Token" });
  }

  next();
};
