"use server"

import { z } from "zod"
import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formSchema } from "../bbs-posts/[bbsId]/edit/page";



export const updataBBS = async ({id,title, username, content }: z.infer<typeof formSchema>) => {
    console.log(id)
    await prisma.post.update({
        where: {
            id: parseInt(id)
        },
        data: {
            title,
            username,
            content
        }
    });

    revalidatePath("");
    redirect("/")
}