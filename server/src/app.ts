import express from "express";
import authRoute from "./routes/auth/auth-route";
import cors from "cors";
import envConfig from "./config/config";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: envConfig.frontendURL,
    credentials: true,
  })
);

app.use("/api", authRoute);

export default app;
