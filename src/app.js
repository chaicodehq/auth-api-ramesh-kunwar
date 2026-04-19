import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import cookieParser from "cookie-parser";

/**
 * TODO: Create Express app
 *
 * 1. Create app with express()
 * 2. Add express.json() middleware
 * 3. Add GET /health route → { ok: true }
 * 4. Mount auth routes at /api/auth
 * 5. Mount user routes at /api/users
 * 6. Add notFound middleware
 * 7. Add errorHandler middleware (must be last!)
 * 8. Return app
 */
export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);

  console.log("hello app ran");
  app.get("/health", (req, res) => {
    res.status(200).json({ msg: "OK" });
  });

  app.use(errorHandler);
  return app;
}
