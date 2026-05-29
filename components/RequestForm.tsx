"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type RequestFormProps = {
  itemName: string;
};

export default function RequestForm({ itemName }: RequestFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const requesterName = formData.get("requesterName") as string;
    const requesterContact = formData.get("requesterContact") as string;
    const message = formData.get("message") as string;

    const { error } = await supabase.from("requests").insert({
      item_name: itemName,
      requester_name: requesterName,
      requester_contact: requesterContact,
      message,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error(error);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-5 rounded-2xl border border-[#ebe4da] bg-white/70 p-4 text-sm leading-6 text-neutral-700">
        Request sent for{" "}
        <strong className="text-neutral-950">{itemName}</strong>. I&apos;ll
        follow up with you soon.
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
            name="requesterName"
            type="text"
            placeholder="Your name"
            className="w-full rounded-2xl border border-[#ebe4da] bg-white/70 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#d1b5a0] focus:bg-white"
          />

          <input
            required
            name="requesterContact"
            type="text"
            placeholder="Your contact info"
            className="w-full rounded-2xl border border-[#ebe4da] bg-white/70 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#d1b5a0] focus:bg-white"
          />

          <textarea
            name="message"
            placeholder="Optional message"
            className="min-h-24 w-full resize-none rounded-2xl border border-[#ebe4da] bg-white/70 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#d1b5a0] focus:bg-white"
          />

          {errorMessage && (
            <p className="text-sm font-medium text-red-600">{errorMessage}</p>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-full bg-[#181411] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f0d0b] disabled:cursor-not-allowed disabled:bg-neutral-400"
            >
              {isSubmitting ? "Sending..." : "Send request"}
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