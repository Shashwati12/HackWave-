import express from 'express';
import {auth} from '../middleware/auth.middleware';
import * as sponsorCtrl from "../controllers/sponsor.controller";


export default function sponsorRouter() {

  const router = express.Router();

  router.get('/',sponsorCtrl.getExistingSponsors);
  router.get('/description/:id', sponsorCtrl.getSponsorDescription);

  router.use(auth);
  router.get('/history', sponsorCtrl.getSponsoredEvents);
  router.post('/sponsor', sponsorCtrl.sponsorshipRequestAsSponsor);
  router.post('/confirm', sponsorCtrl.deal);
  router.patch('/update', sponsorCtrl.updateDetails);

  return router;
    
}