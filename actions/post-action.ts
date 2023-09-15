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


export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB()
    
    //calculate skip
    const skips = (pageNumber - 1) * pageSize

    //fetch the top lvl posts not comments or reply
    const postsQuery = Post.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: 'descending' })
        .skip(skips)
        .limit(pageSize)
        .populate({ path: 'author', model: User })
        .populate({
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: "_id name parentId image"

            }
        })
    const totalPostsCount = await Post.countDocuments({ parentId: { $in: [null, undefined] } })

    const posts = await postsQuery.exec()

    const isNextPage = totalPostsCount > skips + posts.length

    return { posts, isNextPage }
}