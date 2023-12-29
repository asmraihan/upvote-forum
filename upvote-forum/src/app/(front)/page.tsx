import AddThread from "@/components/client/AddThread";
import PostCard from "@/components/common/PostCard";
import Loading from "@/components/common/loading";
import { fetchPosts } from "@/lib/serverActions";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home() {
  const posts: Array<PostType> | [] = await fetchPosts(1);
  return (
    <div>
      <div className="flex justify-center items-center invert dark:invert-0 pt-4">
        <Image
          src="/images/logo.svg"
          width={40}
          height={40}
          alt="Logo"
          className="hidden md:block"
        />
      </div>
      <AddThread />

      <Suspense fallback={<Loading />}>
        <div className="mt-10">
          {posts.map((item) => (
            <PostCard post={item} key={item.id} />
          ))}
        </div>
      </Suspense>

    </div>
  );
}
