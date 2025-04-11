import { NextResponse } from 'next/server';
import { projects } from '../../data';
import { simulateDelayAndErrors, handleApiError } from '../../utils';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await simulateDelayAndErrors();
    const project = projects.find((p) => p.id === params.id);
    if (!project) {
      return new NextResponse(JSON.stringify({ message: 'Project not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return NextResponse.json(project);
  } catch (error: unknown) {
    return handleApiError(error as Error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await simulateDelayAndErrors();
    const body = await request.json();
    const index = projects.findIndex((p) => p.id === params.id);
    if (index === -1) {
      return new NextResponse(JSON.stringify({ message: 'Project not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    projects[index] = { ...projects[index], ...body };
    return NextResponse.json(projects[index]);
  } catch (error: unknown) {
    return handleApiError(error as Error);
  }
}
