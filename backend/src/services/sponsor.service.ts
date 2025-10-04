import {prisma} from '../config/prisma.config';
import type { sponsorEventCollab, sponsorUpdation } from '../types/sponsor.types';
import { ApiError } from '../utils/appError';


export const getSponsors = async() => {
    return await prisma.sponsor.findMany();
}

export const getSponsorDescription = async(id: number) => {
    return await prisma.sponsor.findUnique({
        where: {id: id},
        include: {user: true}
    })
}

export const initiateRequest = async(senderId: number, receiverId: number) => {
    return await prisma.request.create({
        data: {
            senderId,
            receiverId
        }
    })
}

export const acceptSponsorship = async(payload: sponsorEventCollab) => {

    let response = await prisma.user.findFirst({
        where: {id: payload.sponsor_id},
        include: {sponsor :true}
    });
    if(!response?.sponsor) throw new ApiError('No such vendor exists', 401);

    return await prisma.eventSponsor.create({
        data: {
            contribution_amount: payload.contribution_amount,
            layer: payload.layer,
            event: {
                connect: { id: payload.event_id }, 
            },
            sponsor: {
                connect: {id: response.sponsor.id }, 
            }
        }
    })
}

export const SponsoredEvents = async(sponsorId: number) => {

    const sponsor = await prisma.sponsor.findFirst({
        where: {userId: sponsorId}
    })

    return await prisma.eventSponsor.findMany({
        where: {
            sponsor_id: sponsor?.id
        }
    })
}

export const profileUpdate = async(sponsorId: number, pledged_amount: number) => {

    const sponsor = await prisma.sponsor.findFirst({
        where: {
            userId: sponsorId
        }
    })

  return await prisma.sponsor.update({
    where: {
        id: sponsor?.id
    },
    data: {
        pledged_amount
    }
  })
}