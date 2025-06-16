"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="lg:px-20 fixed z-[1000] w-full top-0 left-0 lg:pt-5">
      <nav className="relative flex items-center justify-between bg-white shadow-[0_4px_32px_rgba(0,0,0,0.25)] px-5 py-4 rounded-[10px]">
        <Link className="inline-block" href="/">
          <img src="/images/logo.png" className="w-48" alt="" />
        </Link>

        <ul className="hidden lg:flex items-center gap-x-2">
          {[
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
            { name: "Contact", url: "/contact" },
          ].map((item, index) => (
            <li key={index} className="px-4">
              <Link
                href={item.url}
                className={` ${
                  pathname === item.url
                    ? "text-primary font-semibold"
                    : "text-black hover:text-primary"
                } transition-all duration-200 ease-in-out`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <Button className="max-lg:hidden" href="/">
          Start Now!
        </Button>

        <button className="flex lg:hidden relative"></button>
      </nav>
    </header>
  );
};

export default Header;
