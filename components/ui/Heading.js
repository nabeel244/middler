'use client';
import PreHeading from "@/components/ui/PreHeading";

const Heading = ({ oh = false, preheading = "", heading = "", className = "", highlight = "" }) => {
  const parts = heading.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <div className="flex flex-col items-center gap-4">
      {!oh && <PreHeading children={preheading} />}
      <h2 className={`font-bold lg:text-[50px] text-center ${className}`}>
        {parts.map((part, idx) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={idx} className="text-primary">{part}</span>
          ) : (
            <span key={idx}>{part}</span>
          )
        )}
      </h2>
    </div>
  );
};

export default Heading;
