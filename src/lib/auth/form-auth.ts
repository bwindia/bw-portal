"use server";

import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";

const secret = new TextEncoder().encode(process.env.FORM_SECRET!);

export async function generateScheduleFormToken(scheduleRequestId: string) {
  const token = await new SignJWT({ scheduleRequestId })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return token;
}

export async function verifyFormToken(token: string) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch {
    return null;
  }
}
