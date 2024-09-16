import { NextResponse } from 'next/server';
import prisma from '../../../lib/prismaClient';

export async function GET(req: Request, res: Response) {
    const allBBSPosts = await prisma.post.findMany({
        orderBy: {
            id: 'asc',
        },
    });
    return NextResponse.json(allBBSPosts);
}