import Questionnaire from "@/components/layouts/Questionnaire";
import { FaCheck } from "react-icons/fa";

const page = () => {
  return (
    <div className="overflow-hidden w-full p-3 pt-5 bg-cover bg-no-repeat bg-center bg-[url('/images/modals/bg_1.png')]">
      <div className="grid size-full grid-rows-1 xl:grid-cols-[auto_1fr_auto] gap-5">
        <div className="pt-10 max-w-[225px]">
          <img src="/images/modals/1.png" className="h-full w-full" alt="" />
        </div>
        <div className="w-full flex items-center flex-col justify-between">
          <img src="/images/logo.png" className="max-w-[240px]" alt="" />

          <div className="px-[35px] py-6 flex items-center justify-center gap-x-[150px] pt-5">
            <div className="size-10 rounded-full bg-primary text-white relative flex items-center justify-center before:absolute before:top-1/2 before:-translate-y-1/2 before:left-full before:h-[3px] before:w-[150px] before:bg-[#6F6F6F] before:z-0 after:absolute after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[3px] after:w-[150px] after:bg-primary">
              <FaCheck />
              <span className="font-bold text-primary absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap">
                Project Details
              </span>
            </div>

            <div className="size-10 rounded-full border-2 border-primary relative flex items-center justify-center before:absolute before:top-1/2 before:-translate-y-1/2 before:left-full before:ml-0.5 before:h-[3px] before:w-[150px] before:bg-[#6F6F6F]">
              <span className="inline-block size-3.5 rounded-full bg-primary" />
              <span className="font-normal text-primary absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap">
                See Prices
              </span>
            </div>

            <div className="size-10 rounded-full border-2 border-[#6F6F6F] flex items-center justify-center relative">
              <span className="font-normal text-[#6F6F6F] absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap">
                Use it
              </span>
            </div>
          </div>

          <div className="px-10 w-full">
            <div className="px-11 py-[6vh] flex flex-col items-center justify-center gap-[30px] bg-white shadow-[0_6px_46px] shadow-black/20 rounded-[31px]">
              {/* <Questionnaire /> */}
            </div>
          </div>

          <div className="mt-4 w-full">
            <img src="/images/modals/3.png" className="w-full object-cover max-h-[200px] rounded-2xl" alt="" />
          </div>
        </div>
        <div className="pt-10 max-w-[225px]">
          <img src="/images/modals/2.png" className="h-full w-full" alt="" />
        </div>
      </div>
    </div>
  );
};

export default page;
