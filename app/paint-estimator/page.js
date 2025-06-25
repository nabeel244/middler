"use client";

import Navbar from "@/components/layouts/Navbar";
import Questionnaire from "@/components/layouts/Questionnaire";
import Progress from "@/components/ui/Progress";

const page = () => {
  return (
    <div className="min-h-dvh h-full overflow-hidden w-full p-5 lg:p-3 xl:p-5 bg-cover bg-no-repeat bg-center bg-[url('/images/modals/bg_1.png')]">
      <div className="grid size-full min-h-[calc(100dvh_-_40px)] lg:min-h-[calc(100dvh_-_32px)] xl:min-h-[calc(100dvh_-_40px)] lg:grid-rows-1 xl:grid-cols-[0.18fr_1fr_0.18fr] gap-5">
        <div className="max-lg:hidden mt-40 bg-cover bg-center bg-no-repeat bg-[url('/images/modals/1.png')] rounded-2xl" />
        <div className="w-full flex items-center flex-col justify-between gap-5">
          <Navbar />

          <Progress />

          <div className="lg:hidden">
            <img src="/images/modals/team.png" alt="" />
          </div>

          <div className="lg:px-20 w-full">
            <div className="px-4 lg:px-11 py-[30px] lg:py-5 flex flex-col items-center justify-center gap-[30px] bg-white shadow-[0_6px_46px] shadow-black/20 rounded-3xl lg:rounded-[31px]">
              <Questionnaire />
            </div>
          </div>

          <div className="max-lg:hidden w-full max-h-1/4">
            <img
              src="/images/modals/3.png"
              className="w-full object-cover h-full rounded-2xl"
              alt=""
            />
          </div>

          <div className="lg:hidden grid w-full grid-cols-2 gap-3">
            <div className="col-span-2">
              <img src="/images/modals/wmn_laugh.png" alt="" />
            </div>
            <div>
              <img src="/images/modals/car.png" alt="" />
            </div>
            <div>
              <img src="/images/modals/five_star.png" alt="" />
            </div>
          </div>
        </div>
        <div className="max-lg:hidden mt-40 bg-cover bg-center bg-no-repeat bg-[url('/images/modals/2.png')] rounded-2xl" />
      </div>
    </div>
  );
};

export default page;
