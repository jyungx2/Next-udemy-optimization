import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";

// export const metadata = {
//   title: "All Posts",
//   description: "Browse all our posts.",
// };

// 📌 동적 메타데이터 생성 함수
// generateMetadata는 NextJS가 페이지 렌더링 시 자동으로 실행하는 예약된 함수명
export async function generateMetadata({ searchParams }) {
  // ✅ 매개변수로 { params, searchParams } 객체를 받을 수 있음
  // - params: 동적 라우트 파라미터 (예: [id].js의 id 값)
  // - searchParams: URL 쿼리 파라미터
  // ➡️ 현재 페이지에서는 동적 라우트가 아니므로 params는 사용하지 않음
  const posts = await getPosts();
  const numberOfPosts = posts.length;
  return {
    title: `Browse all our ${numberOfPosts} posts.`,
    description: "Browse all our posts.",
  };
}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
