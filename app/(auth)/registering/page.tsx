import AccountProfileForm from '@/components/forms/AccountProfileForm'
import React from 'react'
import { currentUser } from '@clerk/nextjs'
const page = async() => {

  const user = await currentUser()

  //db user
  const userInfo = {}
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  }
  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
          <h1 className='text-gray-100 text-xl font-semibold'>
            Additional information
          </h1>
          <p className='text-gray-300 mt-3 font-semibold'>Complete your profile</p>

          <section className='mt-10 bg-zinc-900 p-10'>
            <AccountProfileForm user={userData} btnText='Continue' />
          </section>
    </main>
  )
}

export default page