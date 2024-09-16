import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CalendarIcon, UserIcon } from "lucide-react"
import { BBSData } from '@/app/types/types'

async function getDetailBBSData(id: number) {
const response = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: 'no-cache',
  });

  const bbsDetailData : BBSData = await response.json();
  return bbsDetailData;
}
const BBSDetailPage = async ({params} : {params:{bbsId : number}}) => {
    const bbsDetailData = await getDetailBBSData(params.bbsId);
    const { title, username, content, createdAt } = bbsDetailData;
    console.log(bbsDetailData);
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{title}</CardTitle>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
            <span className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1" />
              {username}
            </span>
            <span className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {new Date(createdAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <div className="prose prose-lg">
            {content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BBSDetailPage
