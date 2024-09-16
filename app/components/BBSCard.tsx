import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BBSData } from '../types/types'
import { ChevronRight } from 'lucide-react'

const BBSCard = ({ bbsData }: { bbsData: BBSData }) => {
  const { id, title, username, content } = bbsData

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">投稿者: {username}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/bbs-posts/${id}`} className="flex items-center">
            Read More
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/bbs-posts/${id}/edit`} className="flex items-center">
            Edit
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default BBSCard