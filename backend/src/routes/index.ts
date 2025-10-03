import { Router } from 'express'
import type { Multer } from 'multer'
import { SupabaseClient } from '@supabase/supabase-js'


export default function routes(upload: Multer, supabase: SupabaseClient) {
  const router = Router();

  return router;
}
