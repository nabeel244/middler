"use client";

import { menuItems } from "@/app/constants";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
    };

    router.events?.on?.("routeChangeStart", handleRouteChange);
    return () => {
      router.events?.off?.("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    <header className="lg:px-20 fixed z-[1000] w-full top-0 left-0 lg:pt-5">
      <nav ref={dropdownRef} className="relative flex items-center justify-between bg-white shadow-[0_4px_32px_rgba(0,0,0,0.25)] px-5 py-4 lg:rounded-[10px]">
        <Link className="inline-block" href="/">
          <img src="/images/logo.png" className="w-24 lg:w-48" alt="" />
        </Link>

        <ul className="hidden lg:flex items-center gap-x-2">
          {menuItems.slice(0, 3).map((item, index) => (
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
        <Button className="max-lg:hidden" href="/">
          Start Now!
        </Button>

        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="flex lg:hidden"
        >
          <span className="w-[26px] h-4 flex flex-col relative justify-between">
            {[...Array(3)].map((_, index) => (
              <span
                key={index}
                className={`h-0.5 bg-black block left-0 rounded-xl ${index === 0
                  ? "top-0"
                  : index === 1
                    ? "top-1/2 -translate-y-1/2 w-4/5"
                    : "bottom-0"
                  }`}
              />
            ))}
          </span>
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md rounded-b-2xl px-5 py-4 absolute top-full left-0 w-full z-[999]">
          <ul className="flex flex-col gap-4">
            {menuItems.slice(0, 3).map((item, index) => (
              <li key={index} className="pl-1">
                <Link
                  href={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block ${pathname === item.url
                    ? "text-primary font-semibold"
                    : "text-black hover:text-primary"
                    } transition-all duration-200 ease-in-out`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <Button small className="w-full" href="/">
                Start Now!
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
