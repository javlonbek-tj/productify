import { eq } from 'drizzle-orm';
import { db } from '../index';
import {
  refreshTokens,
  otps,
  type NewRefreshToken,
  type NewOtp,
} from '../schema';

export const refreshTokenQueries = {
  findByUserId: (userId: string) =>
    db.select().from(refreshTokens).where(eq(refreshTokens.userId, userId)),

  findByToken: async (token: string) => {
    const [refreshToken] = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, token));
    return refreshToken;
  },

  create: async (data: NewRefreshToken) => {
    const [refreshToken] = await db
      .insert(refreshTokens)
      .values(data)
      .returning();
    return refreshToken;
  },

  deleteByUserId: async (userId: string) => {
    const [refreshToken] = await db
      .delete(refreshTokens)
      .where(eq(refreshTokens.userId, userId))
      .returning();
    return refreshToken;
  },

  deleteByToken: async (token: string) => {
    const [refreshToken] = await db
      .delete(refreshTokens)
      .where(eq(refreshTokens.token, token))
      .returning();
    return refreshToken;
  },
};

export const otpQueries = {
  findByUserId: async (userId: string) => {
    const [otp] = await db.select().from(otps).where(eq(otps.userId, userId));
    return otp;
  },

  upsert: async (data: NewOtp) => {
    const [otp] = await db
      .insert(otps)
      .values(data)
      .onConflictDoUpdate({
        target: otps.userId,
        set: {
          otpHash: data.otpHash,
          expiresAt: data.expiresAt,
          updatedAt: new Date(),
        },
      })
      .returning();
    return otp;
  },

  deleteByUserId: async (userId: string) => {
    const [otp] = await db
      .delete(otps)
      .where(eq(otps.userId, userId))
      .returning();
    return otp;
  },
};
