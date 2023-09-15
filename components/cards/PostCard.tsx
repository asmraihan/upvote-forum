import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface Props {
  id: string,
  currentUserId: string,
  parentId: string | null,
  content: string,
  author: {
    name: string,
    image: string,
    id: string
  },
  createdAt: string,
  comments: {
    author: {
      image: string,
    },
  }[]
  isComment?: boolean
}

const PostCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  comments
}: Props) => {
  return (
    <article className='flex w-full flex-col rounded-xl bg-zinc-900 p-7'>
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
            <div className='flex flex-col items-center'>
                  <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                    <Image 
                    src={author.image}
                    alt='Profile image'
                    fill
                    className='cursor-pointer rounded-full'
                    />
                  </Link>
              </div>
        </div>
      </div>
        <h2 className='text-sm text-white '>
          {content}
        </h2>
    </article>
  )
}

export default PostCard