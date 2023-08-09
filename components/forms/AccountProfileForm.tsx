'use client'

import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userValidation } from '@/lib/validations/user'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import Image from 'next/image'
import { Textarea } from '../ui/textarea'
import { isBase64 } from '@/lib/utils'
import { useUploadThing } from '@/lib/uploadthing'
import { updateUser } from '@/actions/user-actions'
import { usePathname, useRouter } from 'next/navigation'
interface AccountProfileFormProps {
    user: {
        id: string,
        objectId: string,
        username: string,
        name: string,
        bio: string,
        image: string
    }
    btnText: string
}

const AccountProfileForm: React.FC<AccountProfileFormProps> = ({
    user, btnText
}) => {
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing("media")
    const router = useRouter()
    const pathname = usePathname()

    const form = useForm({
        resolver: zodResolver(userValidation),
        defaultValues: {
            profile_photo: user?.image || '',
            name: user?.name || '',
            username: user?.username || '',
            bio: user?.bio || '',
        }
    })

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        e.preventDefault()

        const fileReader = new FileReader()
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setFiles(Array.from(e.target.files))
            if (!file.type.includes('image')) return

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || ''
                fieldChange(imageDataUrl)
            }

            fileReader.readAsDataURL(file)
        }
    }

    const onSubmit = async (values: z.infer<typeof userValidation>) => {
        const blob = values.profile_photo
        const isImageChanged = isBase64(blob)
        if (isImageChanged) {
            const imgRes = await startUpload(files)
            if (imgRes && imgRes[0].fileUrl) {
                values.profile_photo = imgRes[0].fileUrl
            }
        }
        // update user
        await updateUser({
            userId: user.id,
            username: values.username,
            name: values.name,
            image: values.profile_photo,
            bio: values.bio,
            path: pathname
        })
        
        if(pathname === '/profile/edit') {
            router.back()
        } else {
            router.push('/')
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-4">
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4 '>
                            <FormLabel className='flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800'>
                                {field.value ? (
                                    <Image src={field.value}
                                        alt='profile_photo'
                                        width={64}
                                        height={64}
                                        priority
                                        className='rounded-full object-contain '
                                    />
                                ) : (
                                    <Image src='/assets/profile.svg'
                                        alt='profile_photo'
                                        width={24}
                                        height={24}
                                        className='object-contain'
                                    />
                                )}
                            </FormLabel>
                            <FormControl className='flex-1 text-base font-semibold text-gray-300'>
                                <Input type='file'
                                    accept='image/*'
                                    className='cursor-pointer border-none bg-transparent outline-none file:text-blue-600'
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='flex flex-col w-full gap-3'>
                            <FormLabel className='font-semibold text-gray-300'>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='border border-zinc-700 bg-zinc-800 text-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
                                    {...field}
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-3 w-full'>
                            <FormLabel className='font-semibold text-gray-300'>
                                Username
                            </FormLabel>
                            <FormControl className='flex-1 text-base font-semibold text-gray-300'>
                                <Input
                                    type='text'
                                    className='border border-zinc-700 bg-zinc-800 text-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
                                    {...field}
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-3 w-full'>
                            <FormLabel className='font-semibold text-gray-300'>
                                Bio (max 300 characters)
                            </FormLabel>
                            <FormControl className='flex-1 text-base font-semibold text-gray-300'>
                                <Textarea
                                    rows={10}
                                    className='border border-zinc-700 bg-zinc-800 text-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
                                    {...field}
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />
                <Button type="submit"
                    className='w-full h-12 bg-zinc-700 text-white font-semibold rounded-md hover:bg-zinc-600'
                >Submit</Button>
            </form>
        </Form>
    )
}

export default AccountProfileForm