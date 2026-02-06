"use client";

import { useState } from "react";

type ConsentPayload = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

const USER_ID = "demo-user";

export function ConsentBanner() {
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && !localStorage.getItem("kvkk-consent-recorded"),
  );
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const submitConsent = async (payload: ConsentPayload) => {
    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: USER_ID,
        policyVersion: "v1.0",
        ...payload,
      }),
    });
    localStorage.setItem("kvkk-consent-recorded", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md rounded-xl border border-zinc-300 bg-white p-4 shadow-xl">
      <h2 className="text-lg font-semibold">KVKK & Çerez Onayı</h2>
      <p className="mt-2 text-sm text-zinc-600">
        Temel çerezler zorunludur. Analitik ve pazarlama çerez tercihlerinizi
        kaydedebiliriz.
      </p>
      <div className="mt-3 space-y-2 text-sm">
        <label className="flex items-center gap-2">
          <input checked disabled type="checkbox" /> Essential
        </label>
        <label className="flex items-center gap-2">
          <input
            checked={analytics}
            onChange={(event) => setAnalytics(event.target.checked)}
            type="checkbox"
          />
          Analytics
        </label>
        <label className="flex items-center gap-2">
          <input
            checked={marketing}
            onChange={(event) => setMarketing(event.target.checked)}
            type="checkbox"
          />
          Marketing
        </label>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          className="rounded bg-black px-3 py-2 text-sm text-white"
          onClick={() =>
            submitConsent({ essential: true, analytics, marketing })
          }
          type="button"
        >
          Kaydet
        </button>
        <button
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
          onClick={() =>
            submitConsent({ essential: true, analytics: false, marketing: false })
          }
          type="button"
        >
          Sadece Zorunlu
        </button>
      </div>
    </div>
  );
}
