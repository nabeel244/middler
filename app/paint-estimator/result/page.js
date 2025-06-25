"use client";
import Navbar from "@/components/layouts/Navbar";
import Result from "@/components/layouts/Result";
import Modal1 from "@/components/modals/Modal1";
import Modal2 from "@/components/modals/Modal2";
import Modal3 from "@/components/modals/Modal3";
import Newsletter from "@/components/modals/Newsletter";
import PriceLoader from "@/components/modals/PriceLoader";
import Progress from "@/components/ui/Progress";
import { useEffect, useRef, useState } from "react";

export default function ResultPage() {

  const [loading, setLoading] = useState(true);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const timers = useRef([]);

  const handlePriceDone = () => {
    setLoading(false);
    timers.current.push(setTimeout(() => setShowRoleModal(true), 3000));
  };

  const handleRoleSelect = () => {
    setShowRoleModal(false);
    timers.current.push(setTimeout(() => setShowNewsletter(true), 2000));
  };

  const handleNewsletterClose = () => {
    setShowNewsletter(false);
    timers.current.push(setTimeout(() => setShowSurvey(true), 2000));
  };

  const handleSurveyClose = () => {
    setShowSurvey(false);
    timers.current.push(setTimeout(() => setShowGift(true), 2000));
  };

  useEffect(() => () => timers.current.forEach(t => clearTimeout(t)), []);

  return (
    <div className="min-h-dvh h-full overflow-hidden w-full p-5 lg:p-3 xl:p-5 bg-cover bg-no-repeat bg-center bg-[url('/images/modals/bg_1.png')] relative">
      <div className="grid size-full min-h-[calc(100dvh_-_40px)] lg:min-h-[calc(100dvh_-_32px)] xl:min-h-[calc(100dvh_-_40px)] lg:grid-rows-1 xl:grid-cols-1 gap-5">
        <div className="w-full flex items-center flex-col justify-between gap-5">
          <Navbar />
          <Progress step={1} />
          <Result loading={loading} />
        </div>
      </div>

      {loading && <PriceLoader onComplete={handlePriceDone} />}
      {showRoleModal && <Modal1 onSelect={handleRoleSelect} />}
      {showNewsletter && <Newsletter onClose={handleNewsletterClose} />}
      {showSurvey && <Modal2 onClose={handleSurveyClose} />}
      {showGift && <Modal3 onClose={() => setShowGift(false)} />}

    </div>
  );
}
