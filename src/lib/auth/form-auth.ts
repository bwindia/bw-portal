"use server";

import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";

const secret = new TextEncoder().encode(process.env.FORM_SECRET!);

export const generateScheduleFormToken = async (scheduleRequestId: string) => {
  const token = await new SignJWT({ scheduleRequestId })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return token;
}

export const verifyFormToken = async (token: string) => {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch {
    return null;
  }
}
