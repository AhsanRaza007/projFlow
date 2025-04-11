import { NextResponse } from 'next/server';
import { favorites } from '../../data';
import { simulateDelayAndErrors, handleApiError } from '../../utils';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await simulateDelayAndErrors();
    if (!favorites.includes(params.id)) {
      favorites.push(params.id);
    }
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    return handleApiError(error as Error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await simulateDelayAndErrors();
    const index = favorites.indexOf(params.id);
    if (index !== -1) {
      favorites.splice(index, 1);
    }
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    return handleApiError(error as Error);
  }
}
