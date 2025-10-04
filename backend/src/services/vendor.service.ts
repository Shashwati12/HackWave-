import {prisma} from '../config/prisma.config';
import type { vendorData, vendorEventCollab } from '../types/vendor.types';
import { ApiError } from '../utils/appError';



export const getVendors = async() => {
    return await prisma.vendor.findMany();
}

export const getVendorDescription = async(id: number) => {
    return await prisma.vendor.findUnique({
        where: {id: id},
        include: {
            user: true
        }
    })

}


export const initiateRequest = async(eventId: number, vendorId: number) => {
    return await prisma.request.create({
        data: {
            senderId: vendorId,
            receiverId: eventId
        }
    })
}

export const acceptRequest = async(payload: vendorEventCollab) => {
    return await prisma.eventVendor.create({
        data: {
            invested_amount: payload.invested_amount,
            service_type: payload.service_type,
            earned_amount: payload.earned_amount,
            event: {
                connect: { id: payload.event_id }, 
            },
            vendor: {
                connect: {userId: payload.vendor_id }, 
            }
        }
    })
}


export const ServicedEvents = async(vendorId: number) => {
    const vendor = await prisma.vendor.findFirst({
        where: {userId: vendorId}
    })

    return await prisma.eventVendor.findMany({
        where: {
            vendor_id: vendor?.id
        }
    })
}


export const profileUpdate = async(vendorId: number, payload: vendorData) => {

    const vendorFound = await prisma.vendor.findFirst({
        where: {
            userId: vendorId
        }
    })

  const { fees, ...rest } = payload;

  const dataToUpdate = Object.fromEntries(
    Object.entries({ fees, ...rest }).filter(([_, v]) => v !== undefined)
  );

  if(!vendorFound) throw new ApiError("Not found", 401);
  if (JSON.stringify(dataToUpdate) === "{}") throw new ApiError("No fields passed", 400);

  return await prisma.sponsor.update({
    where: {
        id: vendorFound.id
    },
    data: dataToUpdate
  })
}