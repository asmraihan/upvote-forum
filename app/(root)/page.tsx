//app/page.tsx
import { fetchPosts } from "@/actions/post-action";
import PostCard from "@/components/cards/PostCard";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  const result = await fetchPosts(1, 30);
  console.log(result, "result");
  return (
    <>
      <section className="mt-9 flex-col gap-10">
        {
          result.posts.length === 0 ? (
            <p className="text-red-500">No post found</p>
          ) : (
            <>
              {
                result.posts.map((post) => (
                  <PostCard
                    key={post._id}
                    id={post._id}
                    currentUserId={user?.id || ''}
                    parentId={post.parentId}
                    content={post.text}
                    author={post.author}
                    createdAt={post.createdAt}
                    comments={post.children}
                  />
                ))
          }
            </>
          )
        }
      </section>
    </>
  )
}