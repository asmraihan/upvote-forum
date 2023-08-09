"use server"

import Post from "@/lib/models/post.model"
import User from "@/lib/models/user.model"
import { connectToDB } from "@/lib/mongoose"
import { revalidatePath } from "next/cache"


interface Params {
    text: string,
    author: string,
    path: string
}


export async function createPost({
    text,
    author,
    path
}: Params) {

    try {
        connectToDB()

        const createPost = await Post.create({
            text,
            author
        })

        await User.findByIdAndUpdate(author, {
            $push: { posts: createPost._id }
        })
        revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Failed to create post ${error.message}`)
    }
}