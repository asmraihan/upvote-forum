'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import * as z from "zod"
import Image from 'next/image'
import { Textarea } from '../ui/textarea'
import { usePathname, useRouter } from 'next/navigation'
// import { updateUser } from '@/actions/user-actions'
import { PostValidation } from '@/lib/validations/post'

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


const PostForm = ({ userId }: { userId: string }) => {

    const router = useRouter()
    const pathname = usePathname()

    const form = useForm({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            post: '',
            accountId: userId
        }
    })

    const onSubmit = async (values: z.infer<typeof PostValidation>) => {
        await createPost()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-4 mt-10">
            <FormField
                    control={form.control}
                    name="post"
                    render={({ field }) => (
                        <FormItem className='flex flex-col w-full gap-3'>
                            <FormLabel className='font-semibold text-gray-300'>
                                Content
                            </FormLabel>
                            <FormControl className='focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border border-black bg-zinc-900 text-gray-300'>
                                <Textarea
                                    rows={15}
                                  
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                  <Button type="submit"
                    className='w-fit ml-auto bg-primary text-white font-semibold rounded-md'
                >Submit</Button>
            </form>
        </Form>
    )
}

export default PostForm