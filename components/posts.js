"use client";

import { useOptimistic } from "react";

import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { togglePostLikeStatus } from "@/actions/posts";
import Image from "next/image";

// Cloudinary 이미지 최적화를 위한 로더 함수
// config 객체를 통해 src와 quality 값을 받아서 Cloudinary URL을 생성
function imageLoader(config) {
  const urlStart = config.src.split("upload/")[0];
  const urlEnd = config.src.split("upload/")[1];

  // Cloudinary 변환 파라미터 설정
  // w_200: 너비 200px로 조정 & height 설정 시, 이미지 화질 깨지므로 자동설정되게끔 설정x
  // q_${config.quality}: Image 컴포넌트의 quality prop 값으로 화질 조정
  const transformations = `w_200,q_${config.quality}`;

  // 최종 Cloudinary URL 생성 및 반환
  return `${urlStart}upload/${transformations}/${urlEnd}`;
}

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <Image
          loader={imageLoader}
          src={post.image}
          // These width&height setting won't matter bc we were using Cloudinary for the image transformation and optimization anyways. (= width와 height는 Cloudinary에서 이미지 최적화를 하므로 실제로는 큰 의미가 없음)
          width={200}
          height={120}
          alt={post.title}
          quality={50} // 이미지 품질을 50%로 설정
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const updatedPost = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = updatedPost;
      return newPosts;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId) {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
