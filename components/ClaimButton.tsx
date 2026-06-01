"use client";

import { useState, useTransition } from "react";
import { approveRequest } from "@/app/admin/actions";

type ClaimButtonProps = {
  requestId: string;
  itemName: string;
  requestStatus: string;
};

export default function ClaimButton({ requestId, itemName, requestStatus }: ClaimButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(requestStatus);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const isApproved = status.toLowerCase() === "approved";

  function handleApprove() {
    startTransition(async () => {
      await approveRequest(requestId, itemName);
      setStatus("approved");
      setIsConfirmOpen(false);
    });
  }

  if (isApproved) {
    return (
      <div className="mt-5 rounded-full border border-neutral-200 bg-white/70 px-5 py-3 text-center text-sm font-semibold text-neutral-600">
        Request approved
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsConfirmOpen(true)}
        disabled={isPending}
        className="mt-5 rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
      >
        {isPending ? "Approving request..." : "Approve request"}
      </button>

      {isConfirmOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 backdrop-blur-sm">
          <div className="glass-panel-strong w-full max-w-md rounded-[2rem] p-6 sm:p-7">
            <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-neutral-500">
              Confirm Claim
            </p>

            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
              Mark this item as claimed?
            </h3>

            <p className="mt-4 text-sm leading-7 text-neutral-700 sm:text-base">
              <span className="font-semibold text-neutral-950">{itemName}</span>{" "}
              will be marked as claimed. This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                className="flex-1 rounded-full border border-[#ebe4da] bg-white/65 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApprove}
                disabled={isPending}
                className="flex-1 rounded-full bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
              >
                {isPending ? "Approving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
