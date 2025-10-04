import { prisma } from "../config/prisma.config";
import type { RegisterTeamParams } from "../types/registration.types";


export const registerTeamForEvent = async (RegistrationData: RegisterTeamParams) => {
 
  const {leader_id, event_id,team_name, member_ids} = RegistrationData;
  const event = await prisma.event.findUnique({
    where: { id: event_id },
  });

  if (!event) {
    return { event: null, team: null };
  }


  const team = await prisma.team.create({
    data: {
      name: team_name,
      event_id,
      leader_id,
    },
  });


  if(member_ids) {
    if (!member_ids.includes(leader_id)) {
      member_ids.push(leader_id);
    }

    await prisma.teamMember.createMany({
      data: member_ids.map((member_id) => ({
        team_id: team.id,
        member_id,      
        event_id,
      })),
      skipDuplicates: true,
    });    
    return { event, team };
  }
  

  await prisma.teamMember.createMany({
    data: {
      team_id: team.id,
      event_id,
      member_id: leader_id
    },
  });

  return { event, team };
};

export const getUserRegistrations = async (userId: number) => {
  const registrations = await prisma.teamMember.findMany({
    where: { member_id: userId },
    include: {
      event: true, 
      team : true,
    },
  });

  return registrations;
};

export const getTeamsByEvent = async (eventId: number) => {
  const teams = await prisma.team.findMany({
    where: { event_id: eventId },
    include: {
      members: {
        include: {
          member: true,
        },
      },
      leader: true, 
      event: true,   
    },
  });

  return teams;
};

export const checkUserEventRegistration = async (userId: number, eventId: number) => {
  const registration = await prisma.teamMember.findFirst({
    where: {
      member_id: userId,
      event_id: eventId,
    },
  });

  return registration ? true : false;
};

