// src/services/auth.service.ts

import jwt from "jsonwebtoken";
import {prisma} from "../config/prisma.config";
import config from "../config";
import type { UserContext } from "../types/chat.types";

export async function getUserFromToken(token: string): Promise<UserContext | null> {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET()) ;

    if (!decoded.id) {
      return null;
    }
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id},
    });

    if (!user) {
      return null;
    }

    // Map the database user to our UserContext object
    return {
      id: user.id,
      name: user.name || 'Anonymous',
      role: user.role,
      image_url: user.image_url || '',
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}