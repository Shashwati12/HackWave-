import express from "express";
import cors from "cors";
import multer from "multer";
import { json, urlencoded } from "body-parser";
import routes from "./routes";
import { errorHandler } from "./utils/appError";
import config from "./config";

// Initialize Supabase client for storage operations
import supabase from "./config/supabase.config";

const app = express();


app.use(
  cors({
    origin: config.ALLOWED_ORIGINS || "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);


app.use(json());
app.use(urlencoded({ extended: true }));


const upload = multer({ storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});


app.use("/health",(req,res)=>{
  res.status(200).json({ message: "OK" });
})

app.use("/api/v1", routes(upload, supabase));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});


// Global error handler
app.use(errorHandler);


export default app;