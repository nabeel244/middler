import { menuItems, socials } from "@/app/constants";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br lg:bg-gradient-to-r from-primary-950 to-primary pt-[60px] px-6 pb-5 lg:p-[60px]">
      <div className="container">
        <div className="flex flex-wrap justify-between gap-y-14 pb-5 mb-5 lg:pb-4 lg:mb-4 border-b border-b-white/60">
          <div className="w-full lg:max-w-[481px] flex flex-col gap-y-[19px]">
            <Image
              src="/images/logo_w.webp"
              alt="Company white logo"
              width={236}
              height={100}
              className="max-w-[175px] lg:max-w-[236px]"
            />
            <p className="text-[11px] lg:text-[15px] font-extralight leading-[17px] lg:leading-10 text-white">
              Middler estimates painting jobs by doing all the calculating, with
              smart technology, that's consistent, accurate, reliable, and
              professional, every time.
            </p>
            <ul className="flex lg:hidden items-center gap-4">
              {socials.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <li key={idx}>
                    <Link href={social.url} className="text-white text-xl" aria-label={social.alt}>
                      <Icon />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-full lg:max-w-[151px] px-1">
            <p className="text-[22px] leading-4 font-bold text-white mb-5">
              Links
            </p>
            <ul className="flex flex-col gap-3">
              {menuItems.filter((_, idx) => idx !== 1).map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.url}
                    className="text-[17px] leading-none text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-white max-[400px]:text-xs! text-sm leading-[15px] font-light">
            Copyright &copy; {new Date().getFullYear()}{" "}
            Middler&nbsp;&nbsp;|&nbsp;&nbsp;All rights reserved
          </p>
          <ul className="hidden lg:flex items-center gap-4">
            {socials.map((social, idx) => {
              const Icon = social.icon;
              return (
                <li key={idx}>
                  <Link href={social.url} target="_blank" className="text-white text-xl" aria-label={social.alt}>
                    <Icon />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
