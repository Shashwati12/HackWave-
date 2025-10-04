import { success } from 'zod';
import * as vendorService from '../services/vendor.service';
import { ApiError } from '../utils/appError';
import type { Request, Response } from 'express';
import { sendVendorConfirmation } from '../services/email.service';
import { prisma } from '../config/prisma.config';

export const getExistingVendors = async(req: Request, res: Response) => {
    let vendors = await vendorService.getVendors();
    res.json({
        success: true,
        vendors
    })
}


export const getVendorDescription = async(req: Request, res: Response) => {
    const vendorId = req.params.id;

    if(!vendorId) throw new ApiError('vendorId missing!', 401);
    let vendor = await vendorService.getVendorDescription(parseInt(vendorId));

    res.json({
        success: true,
        vendor
    })
}



export const RequestAsVendor = async(req: Request, res: Response) => {
    const vendor_id = req.userId;
    const {event_id} = req.body;
    if(!vendor_id || !event_id) throw new ApiError('VendorId or EventId missing', 401);
    await vendorService.initiateRequest(vendor_id, event_id);

    res.json({
        success: true,
        message: "invitation sent succesfully"
    })
}


export const deal = async(req: Request, res:Response) => {
    try {
    const vendor_id = req.userId;
    const {event_id, invested_amount, earned_amount, service_type} = req.body;
    req.body.vendor_id = vendor_id;

    if(!vendor_id || !event_id || !invested_amount || !service_type) throw new ApiError("Essential creds missing-event_id/vendor_id/contribution_amount");
    let deal =  await vendorService.acceptRequest(req.body);
    res.json({
        success: true,
        message: "event reserved succesfully"
    })

    await sendVendorConfirmation(vendor_id);
}catch(e) {console.log(e);}
}


export const getVendorServicedEvents = async(req: Request, res: Response) => {

    const vendor_id = req.userId;
    if(!vendor_id) throw new ApiError("vendorId missing", 402);

    let events = await vendorService.ServicedEvents(vendor_id);
    res.json({
        success: true,
        events
    })
}

export const updateProfile = async(req: Request, res:Response) => {

    const vendorId = req.userId;
        
    let sponsor = await vendorService.profileUpdate(vendorId, req.body);
    res.json({
        success: true,
        sponsor
    })
}