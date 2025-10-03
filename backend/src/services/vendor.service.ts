import {prisma} from '../config/prisma.config';
import type { vendorData,vendorEventCollab } from '../types/vendor.types';


export const createVendor = async(name: string, email: string, service_type: string) => {
    return await prisma.vendor.create({
        data: {
            email,
            name,
            service_type,
        }
    })
}

export const updateVendor = async(id: number, payload: vendorData) => {
    const { name, ...rest } = payload;

  const dataToUpdate = Object.fromEntries(
    Object.entries({ name, ...rest }).filter(([_, v]) => v !== undefined)
  );

  if (JSON.stringify(dataToUpdate) === "{}") throw new ApiError("No fields passed for updation", 400);

  return await prisma.vendor.update({
    where: { id },
    data: dataToUpdate,
  });
}

export const getVendors = async() => {
    return await prisma.vendor.findMany();
}

export const getVendorDescription = async(id: number) => {
    return await prisma.vendor.findUnique({
        where: {id: id}
    })
}

export const deleteVendor = async(id: number) => {
    return await prisma.vendor.delete({
        where: {id: id}
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
            event_id: payload.event_id,
            vendor_id: payload.vendor_id,
            invested_amount: payload.invested_amount,
            service_type: payload.,
            earned_amount: payload.earned_amount
        }
    })
}

export const getVendorForEvent = async(eventId: number) => {
    return await prisma.eventVendor.findMany({
        where: {
            event_id: eventId
        },
        include: {
            vendor: true
        }
    })
}