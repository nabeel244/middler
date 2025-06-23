"use client";
import PriceLoader from "@/components/modals/PriceLoader";
import { useState } from "react";

export default function ResultPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-slate-50">
      <div className={loading ? "pointer-events-none blur-sm" : ""}>

      </div>

      {/* {loading && <PriceLoader onComplete={() => setLoading(false)} />} */}

      <PriceLoader onComplete={() => setLoading(false)} />
    </div>
  );
}
