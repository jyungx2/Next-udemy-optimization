import logo from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  console.log(logo);
  return (
    <header id="main-header">
      <Link href="/">
        <Image
          src={logo}
          width={100}
          height={100}
          // sizes="20vw"
          priority // this image will always be visible when the page loads and therefore when navigating to that page, NextJS would preload the image and lazy loading will also be disabled. (-> Elements탭에서 lazy loading 속성이 없어지고, fetchpriority="high"로 설정됨)
          alt="Mobile phone with posts feed on it"
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className="cta-link" href="/new-post">
              New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
