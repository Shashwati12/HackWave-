import { Router } from 'express'
import type { Multer } from 'multer'
import { SupabaseClient } from '@supabase/supabase-js'
import vendorRouter from './vendor.routes';
import sponsorRouter from './sponsor.routes';
import { auth } from '../middleware/auth.middleware';
import authRouter from './auth.routes';
import registrationRouter from './registration.routes';
import eventRouter from './event.routes';

export default function routes(upload: Multer, supabase : SupabaseClient) {
  const router = Router();
    
  router.use('/auth', authRouter());
  router.use(auth)
  router.use('/registration',registrationRouter());
  router.use('/event', eventRouter(upload, supabase));

  return router;
}

