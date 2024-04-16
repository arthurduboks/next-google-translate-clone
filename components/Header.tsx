import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/Google-Translate-Logo.png";

function Header() {
  const { userId } = auth();
  return (
    <header>
      <div>
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
    </header>
  );
}

export default Header;
