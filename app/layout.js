import Header from "@/components/header";
import "./globals.css";

// 루트 레이아웃의 기본 메타데이터 설정
// 1. 페이지별 메타데이터가 없는 경우: 이 메타데이터가 전체적으로 적용됨
// 2. 페이지가 일부 메타데이터만 정의한 경우:
//  - 페이지의 메타데이터가 이 레이아웃의 해당 필드를 덮어씀
//  - 페이지에서 정의하지 않은 필드는 이 레이아웃의 메타데이터를 사용
export const metadata = {
  title: "NextPosts",
  description: "Browse and share amazing posts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
