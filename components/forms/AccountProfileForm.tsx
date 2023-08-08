'use client'

import React, { ChangeEvent } from 'react'
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

    const form = useForm({
        resolver: zodResolver(userValidation),
        defaultValues: {
            profile_photo: user?.image || '',
            name: user?.name || '',
            username: user?.username || '',
            bio: user?.bio || '',
        }
    })

    const handleImage = (e: ChangeEvent, fieldChange: (value: string) => void) => {
        e.preventDefault()
    }

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof userValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4 '>
                            <FormLabel className='flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800'>
                                {field.value ? (
                                    <Image src={field.value}
                                        alt='profile_photo'
                                        width={96}
                                        height={96}
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
                                    placeholder='Upload Profile Photo'
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