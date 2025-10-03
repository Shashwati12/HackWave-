import express from 'express';
import * as vendorCtrl from "../controllers/vendor.controller";
import { Multer } from "multer";
import { SupabaseClient } from "@supabase/supabase-js";

export default function membersRouter(
  upload: Multer,
  supabase: SupabaseClient,
) {

    const router = express.Router();
    
}