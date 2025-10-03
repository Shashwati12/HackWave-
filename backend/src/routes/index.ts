import { Router } from 'express'
import type { Multer } from 'multer'
import { SupabaseClient } from '@supabase/supabase-js'
import vendorRouter from './vendor.routes';
import sponsorRouter from './sponsor.routes';

export default function routes(upload: Multer, supabase: SupabaseClient) {
  const router = Router();

  return router;
}
