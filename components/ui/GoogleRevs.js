const GoogleRevs = () => {
  return (
    <div className="rounded-[86px] py-6 px-12 bg-gradient-to-b from-white to-[#f3f3f3] grd_shdow-2 flex items-center justify-center gap-5">
      <div className="rounded-full p-3.5 bg-white dbl_shw">
        <img src="/images/icons/google.png" className="size-9" alt="" />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="font-semibold text-lg tracking-[2%]">
          5 Star Reviews
        </span>
        <span className="flex items-center gap-[9px]">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.113 0.359939C11.246 -0.0493616 11.825 -0.0493618 11.958 0.359939L14.1787 7.19442C14.2381 7.37746 14.4087 7.50139 14.6012 7.50139H21.7874C22.2177 7.50139 22.3967 8.0521 22.0485 8.30506L16.2347 12.529C16.079 12.6421 16.0139 12.8427 16.0733 13.0257L18.294 19.8602C18.427 20.2695 17.9585 20.6098 17.6104 20.3569L11.7966 16.1329C11.6409 16.0198 11.4301 16.0198 11.2744 16.1329L5.4606 20.3569C5.11242 20.6098 4.64396 20.2695 4.77695 19.8602L6.99761 13.0257C7.05708 12.8427 6.99193 12.6421 6.83622 12.529L1.02247 8.30506C0.674296 8.0521 0.853232 7.50139 1.2836 7.50139H8.46979C8.66226 7.50139 8.83283 7.37746 8.89231 7.19442L11.113 0.359939Z"
                fill="url(#paint0_linear_4299_951)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4299_951"
                  x1="-0.681641"
                  y1="11.2767"
                  x2="23.7526"
                  y2="11.2767"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#275FF6" />
                  <stop offset="1" stopColor="#FF4545" />
                </linearGradient>
              </defs>
            </svg>
          ))}
        </span>
      </div>
    </div>
  );
};

export default GoogleRevs;
