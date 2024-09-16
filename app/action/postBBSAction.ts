"use server"

import { z } from "zod"
import { formSchema } from "../bbs-posts/create/page";
import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export const postBBS = async ({ title, username, content }: z.infer<typeof formSchema>) => {
    await prisma.post.create({
        data: {
            title,
            username,
            content
        }
    });

    revalidatePath("");
    redirect("/")
}