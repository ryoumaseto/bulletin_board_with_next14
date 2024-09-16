import {NextResponse } from 'next/server';
import prisma from '../../../../lib/prismaClient';

export async function GET(req: Request, {params} : {params: {bbsId : string}}) {
    const bbsid = params.bbsId;
    const bbsDetailData = await prisma.post.findUnique({where:{
        id:parseInt(bbsid)
    }});
    return NextResponse.json(bbsDetailData);
}