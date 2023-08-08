import React from 'react'

const RightSidebar = () => {
  return (
    <section className='sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-black bg-zinc-950 px-10 pb-6 pt-28 max-xl:hidden'>
      <div className='flex flex-1 flex-col justify-start'>
      <h3 className='text-2xl font-semibold text-gray-300'>Top Threads</h3>
      </div>
    </section>
  )
}

export default RightSidebar