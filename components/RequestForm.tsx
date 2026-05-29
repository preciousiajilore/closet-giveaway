"use client";

import { useState } from "react";

type RequestFormProps = {
  itemName: string;
};

export default function RequestForm({ itemName }: RequestFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="glass-panel-strong mt-5 rounded-[1.5rem] p-4 text-sm text-[#1f6a3d]">
        Request sent for <strong>{itemName}</strong>! I’ll follow up with you
        soon.
      </div>
    );
  }

  return (
    <div className="mt-5">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="mt-1 w-full rounded-full bg-[#181411] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(63,48,38,0.16)] transition duration-300 hover:scale-[1.01] hover:bg-[#0f0d0b]"
        >
          Request this item
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="glass-panel-strong space-y-3 rounded-[1.75rem] p-3 sm:p-4"
        >
          <input
            required
            type="text"
            placeholder="Your name"
            className="w-full rounded-2xl border border-[#ebe4da] bg-white/70 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#d1b5a0] focus:bg-white"
          />

          <input
            required
            type="text"
            placeholder="Your contact info"
            className="w-full rounded-2xl border border-[#ebe4da] bg-white/70 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#d1b5a0] focus:bg-white"
          />

          <textarea
            placeholder="Optional message"
            className="min-h-24 w-full rounded-2xl border border-[#ebe4da] bg-white/70 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#d1b5a0] focus:bg-white"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-full bg-[#181411] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f0d0b]"
            >
              Send request
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-[#ebe4da] bg-white/65 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-white"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
