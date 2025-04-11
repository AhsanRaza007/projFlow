import { NextResponse } from 'next/server';
import { favorites } from '../data';
import { simulateDelayAndErrors, handleApiError } from '../utils';

export async function GET() {
  try {
    await simulateDelayAndErrors();
    return NextResponse.json(favorites);
  } catch (error: unknown) {
    return handleApiError(error as Error);
  }
}
