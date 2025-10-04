// // services/team.service.ts
// import supabase from "../config/supabase.config";
// import { sendRegistrationConfirmation } from "./email.service";
// import type { Event, Team, TeamMember } from "../types/registration.types";

// interface RegisterTeamParams {
//   event_id: string;
//   team_name: string;
//   leader_id: string;
//   member_ids: string[];
// }

// export const registerTeamForEvent = async ({
//   event_id,
//   team_name,
//   leader_id,
//   member_ids,
// }: RegisterTeamParams): Promise<Team> => {
//   const { data: team, error: teamError } = await supabase
//     .from("teams")
//     .insert([{ event_id, name: team_name, leader_id }])
//     .select()
//     .single();

//   if (teamError) throw teamError;
//   if (!team) throw new Error("Failed to create team");

//   if (!member_ids.includes(leader_id)) {
//     member_ids.push(leader_id);
//   }

//   const team_id = team.id;
//   const memberRecords: TeamMember[] = member_ids.map((member_id) => ({
//     team_id,
//     member_id,
//     event_id,
//   }));

//   const { error: memberError } = await supabase
//     .from("team_members")
//     .insert(memberRecords);

//   if (memberError) throw memberError;

//   const { data: eventData, error: eventError } = await supabase
//     .from("events")
//     .select("*")
//     .eq("id", event_id)
//     .single();

//   if (eventError) throw eventError;
//   if (!eventData) throw new Error("Event not found");

//   await sendRegistrationConfirmation(eventData, leader_id);

//   return team;
// };

// export const getUserRegistrations = async (userId:string) => {
//   const { data, error } = await supabase
//     .from('team_members')
//     .select('event_id, events(*)')
//     .eq('member_id', userId);

//   if (error) throw error;

//   return data;
// };

// export const getTeamsByEvent = async (eventId: string): Promise<Team[]> => {
//   const { data: teams, error } = await supabase
//     .from("teams")
//     .select("*")
//     .eq("event_id", eventId);

//   if (error) throw error;

//   return teams ?? [];
// };

// export const checkUserEventRegistration = async (
//   userId: string,
//   eventId: string
// ): Promise<boolean> => {
//   const { data, error } = await supabase
//     .from("team_members")
//     .select("*")
//     .eq("member_id", userId)
//     .eq("event_id", eventId)
//     .limit(1);

//   if (error) throw error;

//   return (data?.length ?? 0) > 0;
// };


import { prisma } from "../config/prisma.config";
import type { RegisterTeamParams } from "../types/registration.types";


export const registerTeamForEvent = async ({
  event_id,
  team_name,
  leader_id,
  member_ids,
}: RegisterTeamParams) => {
 
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

