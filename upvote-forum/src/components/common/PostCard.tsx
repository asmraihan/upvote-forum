"use client";

import React, { useState } from "react";
import PostUserBar from "./PostUserBar";
import Env from "@/config/env";
import AddComment from "../client/AddComment";
import Link from "next/link";
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
import ShareModal from "./ShareModal";
// import ImageViewer from "./ImageViewer";
import axios from "axios";

export default function PostCard({
  post,
  noRedirect,
  isAuthPost,
}: {
  post: PostType;
  noRedirect?: boolean;
  isAuthPost?: boolean;
}) {
  const [isLiked, setIsLiked] = useState<string>("");
  const likeDislike = (status: string) => {
    setIsLiked(status);
    axios
      .post("/api/like", {
        status: status,
        post_id: post.id,
        toUserId: post.user_id,
      })
      .then((res) => {
        const response = res.data;
      })
      .catch((err) => {
        console.log("The error is", err);
      });
  };

  return (
    <div className="mb-5">
      <PostUserBar post={post} isAuthPost={isAuthPost} />
      <div className="ml-12 mt-[-10px]">
        <Link href={noRedirect == true ? "#" : `/post/${post.id}`}>
          {post.content}
        </Link>
        {/* {post?.image ? <ImageViewer image={post.image} /> : <></>} */}
        <div className="mt-5 flex items-center">
          {post.Likes.length > 0 || isLiked == "1" ? (
            <ChevronDownCircle
              width={20}
              height={20}
              color="#FF4500"
              onClick={() => likeDislike("0")}
              className="cursor-pointer"
            />
          ) : (
            <ChevronUpCircle
              width={20}
              height={20}
              onClick={() => likeDislike("1")}
              className="cursor-pointer"
            />
          )}

          <AddComment post={post} />
          <ShareModal url={`${Env.APP_URL}/post/${post.id}`} />
        </div>
        <div className="mt-2">
          <span className="font-light">{post.comment_count} Replies</span>
          <span className="font-light ml-3">{post.like_count} Likes</span>
        </div>
      </div>
    </div>
  );
}
