'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BBSData } from '@/app/types/types'
import { updataBBS } from '@/app/action/updateBBSAction'

export const formSchema = z.object({
    id: z.string(),
    username: z
      .string()
      .min(5, 'ユーザー名は5文字以上で入力してください')
      .max(20, 'ユーザー名は20文字以内で入力してください'),
    title: z
      .string()
      .min(5, 'タイトルは5文字以上で入力してください')
      .max(50, 'タイトルは50文字以内で入力してください'),
    content: z
      .string()
      .min(20, '内容は20文字以上で入力してください')
      .max(1000, '内容は1000文字以内で入力してください'),
});

async function getDetailBBSData(id: number) {
    const response = await fetch(`http://localhost:3000/api/post/${id}`, {
        cache: 'no-cache',
    });

    const bbsDetailData: BBSData = await response.json();
    return bbsDetailData;
}

const EditBBSPage = ({params} : {params:{bbsId : number}}) => {
    const postId = params.bbsId

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: postId,
            username: '',
            title: '',
            content: '',
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const post = await getDetailBBSData(postId)
            form.reset({
                username: post.username,
                title: post.title,
                content: post.content,
            })
        }
        fetchData()
    }, [form, postId])

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        const { id,title, username, content } = value
        await updataBBS({ id, title, username, content })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">投稿を編集</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type='hidden'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>タイトル</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ユーザー名</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>内容</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={5} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">更新する</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default EditBBSPage
