"use server"

import User from "@/lib/models/user.model"
import { connectToDB } from "@/lib/mongoose"
import { revalidatePath } from "next/cache"

interface Params {
    userId: string,
    username: string,
    name: string,
    image: string,
    bio: string,
    path: string
}

export async function updateUser({
    userId,
    username,
    name,
    image,
    bio,
    path
}: Params): Promise<void> {
    connectToDB()

    try {
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                image,
                bio,
                isRegistered: true
            },
            {
                upsert: true,
            }
        )
        if (path === '/profile/edit') {
            revalidatePath(path)
        }
    } catch (error: any) {
        throw new Error(`Failed to update user ${error.message}`)
    }

}