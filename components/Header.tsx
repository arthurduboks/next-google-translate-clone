import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/Google-Translate-Logo.png";
import { SignInButton, UserButton } from "@clerk/nextjs";

function Header() {
  const { userId } = auth();

  const url = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL
  }/translate`;

  return (
    <header className="flex items-center justify-between px-8 border-b mb-5">
      <div className="flex items-center h-20">
        <Link href="/">
          <Image
            src={logo}
            className="object-contain h-32 cursor-pointer"
            width={200}
            height={200}
            alt="Logo"
          />
        </Link>
      </div>
      {userId ? (
        <div>
          <UserButton />
        </div>
      ) : (
        <SignInButton afterSignInUrl={url} mode="modal" />
      )}
    </header>
  );
}
export default Header;
