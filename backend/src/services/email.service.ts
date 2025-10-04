import transporter from '../config/email.config.ts';
import { prisma } from '../config/prisma.config.ts';
import type { Event } from '../types/registration.types.ts';


export const sendRegistrationConfirmation = async (event:Event, userId:number) => {
  const foundUser = await prisma.user.findFirst({
    where: {id: userId},
  })
  if(!foundUser) throw Error('User profile not found');

  const mailOptions = {
    from: process.env.EMAIL,
    to: foundUser.email,
    subject: `Registration Confirmation - ${event.event_name}`,
    html: `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            min-height: 100vh;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 0;
            right: 0;
            height: 40px;
            background: white;
            border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }
        
        .header h1 {
            color: white;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .checkmark {
            width: 60px;
            height: 60px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .checkmark svg {
            width: 35px;
            height: 35px;
            fill: #667eea;
        }
        
        .content {
            padding: 50px 40px 40px;
        }
        
        .greeting {
            font-size: 20px;
            color: #2d3748;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .message {
            font-size: 16px;
            color: #4a5568;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        
        .event-details {
            background: linear-gradient(135deg, #f6f8ff 0%, #f0f4ff 100%);
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            border-left: 4px solid #667eea;
        }
        
        .event-details h2 {
            color: #667eea;
            font-size: 18px;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .detail-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 16px;
            padding: 12px;
            background: white;
            border-radius: 8px;
            transition: transform 0.2s;
        }
        
        .detail-item:hover {
            transform: translateX(5px);
        }
        
        .detail-item:last-child {
            margin-bottom: 0;
        }
        
        .detail-icon {
            width: 24px;
            height: 24px;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .detail-icon svg {
            width: 100%;
            height: 100%;
            fill: #667eea;
        }
        
        .detail-content {
            flex: 1;
        }
        
        .detail-label {
            font-size: 12px;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
            font-weight: 600;
        }
        
        .detail-value {
            font-size: 16px;
            color: #2d3748;
            font-weight: 500;
        }
        
        .footer-message {
            text-align: center;
            font-size: 16px;
            color: #4a5568;
            margin-top: 30px;
            padding-top: 30px;
            border-top: 2px solid #e2e8f0;
        }
        
        .footer-message strong {
            color: #667eea;
        }
        
        @media (max-width: 600px) {
            .content {
                padding: 40px 25px 30px;
            }
            
            .event-details {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 26px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Registration Confirmed!</h1>
        </div>
        
        <div class="content">
            <p class="greeting">Dear ${foundUser.name},</p>
            
            <p class="message">
                Great news! Your registration for <strong>${event.name}</strong> has been successfully received. 
                We're excited to have you join us!
            </p>
            
            <div class="event-details">
                <h2>Event Details</h2>
                
                <div class="detail-item">
                    <div class="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                        </svg>
                    </div>
                    <div class="detail-content">
                        <div class="detail-label">Event Name</div>
                        <div class="detail-value">${event.event_name}</div>
                    </div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                    </div>
                    <div class="detail-content">
                        <div class="detail-label">Date</div>
                        <div class="detail-value">${event.Date}</div>
                    </div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                    </div>
                    <div class="detail-content">
                        <div class="detail-label">Venue</div>
                        <div class="detail-value">${event.Venue}</div>
                    </div>
                </div>
            </div>
            
            <p class="footer-message">
                <strong>Thank you for registering!</strong><br>
                We look forward to seeing you at the event.
            </p>
        </div>
    </div>
</body>
</html>
    `
  };

  await transporter.sendMail(mailOptions);
};


export const sendVendorConfirmation = async (vendorId:number) => {
  const foundUser = await prisma.user.findFirst({
    where: {id: vendorId}
  })

  if(!foundUser) throw Error('User profile not found');

  const mailOptions = {
    from: process.env.EMAIL,
    to: foundUser.email,
    subject: `Registration Confirmation - Event-Collab`,
    html: `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            min-height: 100vh;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 0;
            right: 0;
            height: 40px;
            background: white;
            border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }
        
        .header h1 {
            color: white;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .checkmark {
            width: 60px;
            height: 60px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .checkmark svg {
            width: 35px;
            height: 35px;
            fill: #667eea;
        }
        
        .content {
            padding: 50px 40px 40px;
        }
        
        .greeting {
            font-size: 20px;
            color: #2d3748;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .message {
            font-size: 16px;
            color: #4a5568;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        
        .event-details {
            background: linear-gradient(135deg, #f6f8ff 0%, #f0f4ff 100%);
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            border-left: 4px solid #667eea;
        }
        
        .event-details h2 {
            color: #667eea;
            font-size: 18px;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .detail-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 16px;
            padding: 12px;
            background: white;
            border-radius: 8px;
            transition: transform 0.2s;
        }
        
        .detail-item:hover {
            transform: translateX(5px);
        }
        
        .detail-item:last-child {
            margin-bottom: 0;
        }
        
        .detail-icon {
            width: 24px;
            height: 24px;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .detail-icon svg {
            width: 100%;
            height: 100%;
            fill: #667eea;
        }
        
        .detail-content {
            flex: 1;
        }
        
        .detail-label {
            font-size: 12px;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
            font-weight: 600;
        }
        
        .detail-value {
            font-size: 16px;
            color: #2d3748;
            font-weight: 500;
        }
        
        .footer-message {
            text-align: center;
            font-size: 16px;
            color: #4a5568;
            margin-top: 30px;
            padding-top: 30px;
            border-top: 2px solid #e2e8f0;
        }
        
        .footer-message strong {
            color: #667eea;
        }
        
        @media (max-width: 600px) {
            .content {
                padding: 40px 25px 30px;
            }
            
            .event-details {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 26px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Registration Confirmed!</h1>
        </div>
        
        <div class="content">
            <p class="greeting">Dear ${foundUser.name}</p>
            
            <p class="message">
                Great news! Your confirmation for <strong>Vendor</strong> service has been successfully received. 
                We're excited to have you join us!
            </p>
            
            <div class="event-details">
                <h2>Event Details</h2>
                
                <div class="detail-item">
                    <div class="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                        </svg>
                    </div>
                    <div class="detail-content">
                        <div class="detail-label"> Position</div>
                        <div class="detail-value">Vendor Service</div>
                    </div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                    </div>
                    <div class="detail-content">
                        <div class="detail-label">Date</div>
                        <div class="detail-value">11/9/2025</div>
                    </div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                    </div>
                    <div class="detail-content">
                        <div class="detail-label">Venue</div>
                        <div class="detail-value">Pune</div>
                    </div>
                </div>
            </div>
            
            <p class="footer-message">
                <strong>Thank you for choosing us!</strong><br>
                We look forward to seeing you at the event.
            </p>
        </div>
    </div>
</body>
</html>
    `
  };

  await transporter.sendMail(mailOptions);
};

export const sendSponsorConfirmation = async (sponsorId:number) => {
  const foundUser = await prisma.user.findFirst({
    where: {id: sponsorId},
  })
  if(!foundUser) throw Error('User profile not found');

  const mailOptions = {
    from: process.env.EMAIL,
    to: foundUser.email,
    subject: `Registration Confirmation - Event - Collab`,
    html: `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            min-height: 100vh;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 0;
            right: 0;
            height: 40px;
            background: white;
            border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }
        
        .header h1 {
            color: white;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .checkmark {
            width: 60px;
            height: 60px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .checkmark svg {
            width: 35px;
            height: 35px;
            fill: #667eea;
        }
        
        .content {
            padding: 50px 40px 40px;
        }
        
        .greeting {
            font-size: 20px;
            color: #2d3748;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .message {
            font-size: 16px;
            color: #4a5568;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        
        .event-details {
            background: linear-gradient(135deg, #f6f8ff 0%, #f0f4ff 100%);
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            border-left: 4px solid #667eea;
        }
        
        .event-details h2 {
            color: #667eea;
            font-size: 18px;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .detail-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 16px;
            padding: 12px;
            background: white;
            border-radius: 8px;
            transition: transform 0.2s;
        }
        
        .detail-item:hover {
            transform: translateX(5px);
        }
        
        .detail-item:last-child {
            margin-bottom: 0;
        }
        
        .detail-icon {
            width: 24px;
            height: 24px;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .detail-icon svg {
            width: 100%;
            height: 100%;
            fill: #667eea;
        }
        
        .detail-content {
            flex: 1;
        }
        
        .detail-label {
            font-size: 12px;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
            font-weight: 600;
        }
        
        .detail-value {
            font-size: 16px;
            color: #2d3748;
            font-weight: 500;
        }
        
        .footer-message {
            text-align: center;
            font-size: 16px;
            color: #4a5568;
            margin-top: 30px;
            padding-top: 30px;
            border-top: 2px solid #e2e8f0;
        }
        
        .footer-message strong {
            color: #667eea;
        }
        
        @media (max-width: 600px) {
            .content {
                padding: 40px 25px 30px;
            }
            
            .event-details {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 26px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Registration Confirmed!</h1>
        </div>
        
        <div class="content">
            <p class="greeting">Dear ${foundUser.name},</p>
            
            <p class="message">
                Great news! Your confirmation for <strong>Sponsorship</strong has been successfully received. 
                We're excited to have you join us!
            </p>
            
            <div class="event-details">
                <h2>Event Details</h2>
                
                <div class="detail-item">
                    <div class="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                        </svg>
                    </div>
                    <div class="detail-content">
                        <div class="detail-label">Position</div>
                        <div class="detail-value">Sponsorship</div>
                    </div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                    </div>
                    <div class="detail-content">
                        <div class="detail-label">Date</div>
                        <div class="detail-value">12/4/25</div>
                    </div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                    </div>
                    <div class="detail-content">
                        <div class="detail-label">Venue</div>
                        <div class="detail-value">Pune</div>
                    </div>
                </div>
            </div>
            
            <p class="footer-message">
                <strong>Thank you for choosing us!</strong><br>
                We look forward to seeing you at the event.
            </p>
        </div>
    </div>
</body>
</html>
    `
  };

  await transporter.sendMail(mailOptions);
};