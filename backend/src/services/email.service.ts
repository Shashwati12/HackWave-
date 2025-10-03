
import transporter from '../config/email.config.ts';
import supabase from "../config/supabase.config.ts";
import type { Event } from '../types/registration.types.ts';


export const sendRegistrationConfirmation = async (event:Event, userId:string) => {

  const { data: user } = await supabase
    .from('users')
    .select('email, name')
    .eq('id', userId)
    .single();

  if(!user) throw Error('User profile not found');

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject: `Registration Confirmation - ${event.event_name}`,
    html: `
      <h1>Registration Confirmation</h1>
      <p>Dear ${user.name},</p>
      <p>Your registration for ${event.event_name} has been received.</p>
      <p>Event Details:</p>
      <ul>
        <li>Event: ${event.event_name}</li>
        <li>Date: ${new Date(event.registration_deadline as string).toLocaleDateString()}</li>
        <li>Venue: ${event.venue}</li>
      </ul>
      <p>Thank you for registering!</p>
    `
  };

  await transporter.sendMail(mailOptions);
};