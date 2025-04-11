import { NextResponse } from 'next/server';
import { projects, generateId } from '../data';
import { simulateDelayAndErrors, handleApiError } from '../utils';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    await simulateDelayAndErrors();
    return NextResponse.json(projects);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return handleApiError(error);
    }
    return handleApiError(new Error('Unknown error occurred'));
  }
}

export async function POST(request: NextRequest) {
  try {
    await simulateDelayAndErrors();
    const body = await request.json();
    const newProject = { ...body, id: generateId() };
    projects.push(newProject);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return handleApiError(error);
    }
    return handleApiError(new Error('Unknown error occurred'));
  }
}
