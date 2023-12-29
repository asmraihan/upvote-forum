import { headers } from "next/headers";
import { Backend_URL } from "./constants";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "@/app/api/auth/[...nextauth]/options";



export async function fetchPosts(page: number) {
    const session: CustomSession | null = await getServerSession(authOptions);
    const formData = new FormData();
    formData.append("user", JSON.stringify(session?.user));
    const res = await fetch(`${Backend_URL}/thread/getAllPosts`, {
        cache: "no-cache",
        method: "POST",
        body: formData,
        headers: headers(),
        next: {
            revalidate: 3600,
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }
    const response = await res.json();
    return response!.data;
}