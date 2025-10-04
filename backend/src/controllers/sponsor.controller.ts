import { success } from 'zod';
import * as sponsorService from '../services/sponsor.service';
import { ApiError } from '../utils/appError';
import type { Request, Response } from 'express';

export const getExistingSponsors = async(req: Request, res: Response) => {
    let sponsors = await sponsorService.getSponsors();
    return res.json({
        success: true,
        sponsors
    })
}


export const getSponsorDescription = async(req: Request, res: Response) => {
    const sponsorId = req.params.id;

    if(!sponsorId) throw new ApiError('SponsorId missing!', 401);
    let description = await sponsorService.getSponsorDescription(parseInt(sponsorId));

    res.json({
        success: true,
        description
    })
}


export const sponsorshipRequestAsSponsor = async(req: Request, res: Response) => {

    const sponsor_id = req.userId;
    const {event_id} = req.body;
    if(!sponsor_id || !event_id) throw new ApiError('SponsorId or EventId missing', 401);

    await sponsorService.initiateRequest(sponsor_id, event_id);
    res.json({
        success: true,
        message: "invitation sent succesfully"
    })
}


export const deal = async(req: Request, res:Response) => {

    const sponsor_id = req.userId;
    const {event_id, contribution_amount, layer} = req.body;
    req.body.sponsor_id = sponsor_id;

    if(!sponsor_id || !event_id) throw new ApiError("Essential creds missing-event_id/sponsor_id");
    await sponsorService.acceptSponsorship(req.body);

    res.json({
        success: true,
        message: "Event reserved succesfully"
    })
}


export const getSponsoredEvents = async(req: Request, res: Response) => {

    const sponsor_id = req.userId;

    let events = await sponsorService.SponsoredEvents(sponsor_id);
    res.json({
        success: true,
        events
    })
}

export const updateDetails = async(req: Request, res: Response) => {

    const sponsorId = req.userId;
    
    let sponsor = await sponsorService.profileUpdate(sponsorId, req.body.pledged_amount);
    res.json({
        success: true,
        sponsor
    })
}