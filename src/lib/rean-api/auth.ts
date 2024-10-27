import { NextResponse } from "next/server";

export const authenticateUser = async (request: Request) => {
  const authorization = request.headers.get("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json(
      {
        status: "error",
        status_code: 401,
        message: "Unauthorized. Bearer token required.",
      },
      { status: 401 }
    );
  }

  // Token verification logic
  const token = authorization.split(" ")[1];
  const isValidToken = await verifyToken(token);
  if (!isValidToken) {
    return NextResponse.json(
      {
        status: "error",
        status_code: 401,
        message: "Unauthorized. Invalid token.",
      },
      { status: 401 }
    );
  }
};

async function verifyToken(token: string): Promise<boolean> {
  try {
    // Decode the Base64 token
    const decodedToken = Buffer.from(token, "base64").toString("utf-8");
    // Get the current date in YYYY-MM-DD format
    const today = new Date();
    const utcOffset = 5.5 * 60 * 60 * 1000; // UTC+5:30 in milliseconds
    const istDate = new Date(today.getTime() + utcOffset); // Adjust to IST
    const currentDate = istDate.toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    // The token should contain "bloodwarriors-YYYY-MM-DD"
    const expectedTokenString = `bloodwarriors-${currentDate}`;
    return decodedToken === expectedTokenString;
  } catch (error) {
    console.error(error);
    return false;
  }
}
