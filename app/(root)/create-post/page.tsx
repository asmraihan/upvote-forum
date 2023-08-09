import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/actions/user-actions'
import PostForm from '@/components/forms/PostForm'

const CreatePost = async () => {
    const user = await currentUser()

    if(!user) return null
    const userInfo = await fetchUser(user.id)
    if(!userInfo?.isRegistered) return ('/registering')
  return (
    <>
        <h1 className='text-3xl font-semibold text-white'>Create Post</h1>
        <PostForm userId={userInfo._id}/>
    </>
  )
}

export default CreatePost