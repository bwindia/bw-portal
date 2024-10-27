import { NextResponse } from "next/server";

export const NextErrorResponse = (message: string, status_code: number) => {
  return NextResponse.json(
    {
      status: "error",
      status_code,
      message,
    },
    { status: status_code }
  );
};

export const NextSuccessDataResponse = (data: any) => {
  return NextResponse.json({
    status: "success",
    status_code: 200,
    data,
  });
};

export const NextSuccessResponse = (message: string) => {
    return NextResponse.json({
      status: "success",
      message
    });
  };
