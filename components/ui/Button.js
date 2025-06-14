import Link from "next/link";

const Button = ({ children, onClick, className, type, href, disabled }) => {
  const Tag = href ? Link : "button";
  return (
    <Tag
      {...(href
        ? { href: href }
        : { onClick: onClick, type: type, disabled: disabled })}
      className={`bg-primary text-white text-sm font-semibold rounded-md px-12 py-[18px] transition-all duration-300 ease-in-out ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Button;
