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
    name: userInfo?.name || user?.firstName + " " + user?.lastName || "", /* FIX */
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  }
  return (
    /* 
     <h1 className='text-gray-100 text-xl font-semibold'>
            Additional information
          </h1>
          <p className='text-gray-300 mt-3 font-semibold'>Complete your profile</p>
    */
    <main className='flex justify-center items-center bg-zinc-900'>
         <section className='w-1/2'>
           <div
                className='w-full h-screen flex flex-col items-center justify-center p-12 bg-cover bg-primary/50 bg-blend-multiply bg-no-repeat'
                style={{ backgroundImage: `url('/images/Register-Background.png')`}}>

            <h1 className="text-white text-4xl font-bold mb-3">Welcome</h1>
            <div>
              <p className="text-white">Join the forum by filling additional info that will make your experience more 👍 <a href="" className="text-blue-600 font-semibold">Learn more</a></p>
            </div>
          </div>
         </section>

          <section className='m-10 w-1/2'>
            <AccountProfileForm user={userData} btnText='Continue' />
          </section>
    </main>
  )
}

export default page