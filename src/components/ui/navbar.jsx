import Image from "next/image";
import { NavigationMenuDemo } from "./navigation-link";
import { Button } from "./button";
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="border-b-[1px] fixed top-0 z-40 w-full bg-[#121212]">
        <div className="container mx-auto max-w-7xl py-3">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-5">
                    <Link href="/">
                    <Image src="/assets/images/logo-light.png" alt="Logo Aeternum" width={130} height={130} />
                    </Link>
                    <NavigationMenuDemo/>
                </div>
                <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                    <Link href="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.001 2c-5.525 0-10 4.475-10 10a9.99 9.99 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10"/></svg>
                        Github
                    </Link>
                </Button>
                <Button variant="outline" className="px-5" asChild>
                    <Link href="/login">Login</Link>
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5" asChild>
                    <Link href="/register">Register</Link>
                </Button>
                </div>
            </div>
        </div>
    </nav>
  );
}