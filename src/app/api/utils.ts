import { NextResponse } from 'next/server';

export const simulateDelayAndErrors = async () => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  if (Math.random() < 0.2) {
    throw new Error('Something Went Wrong!!');
  }
};

export const handleApiError = (error: Error) => {
  return new NextResponse(JSON.stringify({ message: error.message }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
};
