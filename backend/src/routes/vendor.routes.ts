import express from 'express';
import {auth} from '../middleware/auth.middleware';
import * as vendorCtrl from "../controllers/vendor.controller";

  export default function vendorRouter() {
  const router = express.Router();

  router.get('/',vendorCtrl.getExistingVendors);
  router.get('/description/:id', vendorCtrl.getVendorDescription);

  router.use(auth);
  router.get('/history', vendorCtrl.getVendorServicedEvents);
  router.post('/service', vendorCtrl.RequestAsVendor);
  router.post('/confirm', vendorCtrl.deal);
  router.patch('/update', vendorCtrl.updateProfile);

  return router;
}
