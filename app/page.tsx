"use client";

import { useState } from "react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});


type ModalConfig = {
  index: number;
  mode: "normal" | "system";
  message: string;
};

const rebuttals: Omit<ModalConfig, "index">[] = [
  { mode: "normal", message: "Okay, rejector. 💅" },
  { mode: "normal", message: "It's so cute when you play hard to get." },
  { mode: "normal", message: "Okay, we get it now. Accept the invitation. ❤️" },
  { mode: "normal", message: "Oh... 💔" },
  {
    mode: "system",
    message:
      "FATAL ERROR [VAL-14]: Valentine request rejection has triggered emergency cleanup protocol.\n\n" +
      "The following operations are now marked as pending:\n" +
      "- Wiping local user profile cache\n" +
      "- Reformatting primary storage (C:)\n" +
      "- Purging photos, messages, and desktop files\n" +
      "- Reinstalling operating system in Safe Heartbreak Mode\n\n" +
      "ETA: 00:10 before irreversible execution.\n" +
      "Recommended action: Accept invitation immediately.",
  },
  { mode: "normal", message: "(Kidding. XO)" },
];

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [modal, setModal] = useState<ModalConfig | null>(null);
  const [nextRebuttal, setNextRebuttal] = useState(0);
  const [noRemoved, setNoRemoved] = useState(false);

  const handleNoClick = () => {
    if (noRemoved || accepted || nextRebuttal >= rebuttals.length) {
      return;
    }

    setModal({ ...rebuttals[nextRebuttal], index: nextRebuttal });
    setNextRebuttal((current) => current + 1);
  };

  const closeModal = () => {
    if (!modal) return;

    if (modal.index === 4) {
      setModal({ ...rebuttals[5], index: 5 });
      return;
    }

    if (modal.index === 5) {
      setNoRemoved(true);
    }

    setModal(null);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/lily2.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[6px]" />

      <section className="relative z-10 flex min-h-screen items-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="w-full max-w-xl text-left lg:ml-[8vw]">
          <p
            className={`${cormorant.className} text-5xl font-semibold leading-tight text-white drop-shadow-lg sm:text-6xl`}
          >
            Marike
          </p>
          {!accepted && (
            <h1
              className={`${cormorant.className} mt-3 text-5xl font-semibold leading-tight text-white drop-shadow-lg sm:text-7xl`}
            >
              Will you be my Valentine?
            </h1>
          )}

          {!accepted ? (
            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setAccepted(true)}
                className={`${cormorant.className} rounded-full bg-white px-8 py-3 text-2xl font-semibold text-transparent [text-shadow:0_0_0_#0f172ae6] transition hover:bg-white/90`}
              >
                Yes
              </button>
              {!noRemoved && (
                <button
                  type="button"
                  onClick={handleNoClick}
                  className={`${cormorant.className} rounded-full border border-white/80 bg-transparent px-8 py-3 text-2xl font-semibold text-white backdrop-blur-sm transition hover:bg-white/10`}
                >
                  No
                </button>
              )}
            </div>
          ) : (
            <div className="mt-10 max-w-xl overflow-hidden rounded-3xl border border-white/45 bg-white/10 text-white shadow-2xl backdrop-blur-md">
              <div className="border-b border-white/25 bg-white/10 px-6 py-5 sm:px-8">
                <p className={`${cormorant.className} mt-2 text-4xl leading-none sm:text-5xl`}>
                  Reservation Confirmed.
                </p>
              </div>

              <div className={`${cormorant.className} space-y-4 px-6 py-6 sm:px-8 sm:py-7`}>
                <div className="grid grid-cols-[120px_1fr] gap-3 text-2xl sm:text-3xl">
                  <p className="text-white/70">Date</p>
                  <p>Saturday, 14 Feb</p>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-3 text-2xl sm:text-3xl">
                  <p className="text-white/70">Pickup</p>
                  <p>18:00</p>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-3 text-2xl sm:text-3xl">
                  <p className="text-white/70">Dress Code</p>
                  <p>Something pretty</p>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-3 text-2xl sm:text-3xl">
                  <p className="text-white/70">Note</p>
                  <p>Come hungry</p>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-3 text-2xl sm:text-3xl">
                  <p className="text-white/70">Venue</p>
                  <p>Undisclosed</p>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-3 text-2xl sm:text-3xl">
                  <p className="text-white/70">Itinerary</p>
                  <p>Surprise</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-dashed border-white/35 pt-4 text-xs uppercase tracking-[0.2em] text-white/70">
                  <p>Ref: VAL-0214</p>
                  <p>Party of 2</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {modal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/35 p-6 backdrop-blur-sm">
          <div
            className={
              modal.mode === "system"
                ? "w-full max-w-2xl border border-emerald-400/60 bg-black p-6 text-left shadow-2xl"
                : "w-full max-w-md rounded-2xl border border-white/60 bg-white/90 p-6 text-center shadow-2xl backdrop-blur-sm"
            }
          >
            {modal.mode === "system" ? (
              <>
                <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
                  Critical System Alert
                </p>
                <pre className="mt-4 whitespace-pre-wrap font-mono text-sm leading-relaxed text-emerald-200">
                  {modal.message}
                </pre>
              </>
            ) : (
              <p className={`${cormorant.className} text-3xl text-slate-800`}>
                {modal.message}
              </p>
            )}

            <button
              type="button"
              onClick={closeModal}
              className={
                modal.mode === "system"
                  ? "mt-6 rounded-md border border-emerald-300/70 bg-emerald-300/10 px-4 py-2 font-mono text-sm text-emerald-100 transition hover:bg-emerald-300/20"
                  : `${cormorant.className} mt-6 rounded-full bg-slate-900 px-6 py-2 text-2xl text-white transition hover:bg-slate-700`
              }
            >
              {modal.mode === "system" ? "Acknowledge" : "Close"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
