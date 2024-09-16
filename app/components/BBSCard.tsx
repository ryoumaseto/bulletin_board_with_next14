import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BBSData } from '../types/types'
import { ChevronRight, Edit, Person, AccessTime } from '@mui/icons-material'

export default function BBSCard({ bbsData }: { bbsData: BBSData }) {
  const { id, title, username, content, createdAt } = bbsData

  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4">
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground flex items-center">
            <Person className="w-4 h-4 mr-1" />
            {username}
            <AccessTime className="w-4 h-4 ml-4 mr-1" />
            {new Date(createdAt).toLocaleDateString()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3 text-gray-600">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant="outline" size="sm" asChild className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
          <Link href={`/bbs-posts/${id}`} className="flex items-center">
            Read More
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild className="hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300">
          <Link href={`/bbs-posts/${id}/edit`} className="flex items-center">
            Edit
            <Edit className="mr-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}