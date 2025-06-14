'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";


const Header = () => {
  const pathname = usePathname();
  return (
    <header className="px-20 fixed z-[1000] w-full top-0 left-0 pt-5">
      <nav className="relative flex items-center justify-between bg-white shadow-[0_4px_32px_rgba(0,0,0,0.25)] px-5 py-4 rounded-[10px]">
        <Link className="inline-block" href="/">
          <img src="/images/logo.png" className="w-[200px]" alt="" />
        </Link>

        <ul className="flex items-center gap-x-2">
          {[
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
            { name: "Contact", url: "/contact" },
          ].map((item, index) => (
            <li key={index} className="px-4">
              <Link
                href={item.url}
                className={` ${pathname === item.url
                  ? "text-primary font-semibold"
                  : "text-black hover:text-primary"
                  } transition-all duration-200 ease-in-out`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <Button href="/">Start Now!</Button>
      </nav>
    </header>
  );
};

export default Header;
