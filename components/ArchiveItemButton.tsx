"use client";

import { useState, useTransition } from "react";
import { archiveItem } from "@/app/admin/items/actions";

type ArchiveItemButtonProps = {
  itemId: string;
  itemName: string;
  itemStatus: string | null;
};

export default function ArchiveItemButton({
  itemId,
  itemName,
  itemStatus,
}: ArchiveItemButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(itemStatus ?? "Available");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const isArchived = status.toLowerCase() === "archived";

  function handleArchive() {
    startTransition(async () => {
      await archiveItem(itemId);
      setStatus("Archived");
      setIsConfirmOpen(false);
    });
  }

  if (isArchived) {
    return (
      <div className="w-full rounded-full border border-[#dbe4f8] bg-[#edf3ff] px-4 py-3 text-center text-sm font-semibold text-[#1659E0]">
        Item archived
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsConfirmOpen(true)}
        disabled={isPending}
        className="w-full rounded-full bg-[#1659E0] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(22,89,224,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0f4cc4] hover:shadow-[0_18px_34px_rgba(22,89,224,0.28)] disabled:cursor-not-allowed disabled:bg-[#8aaeea]"
      >
        {isPending ? "Archiving item..." : "Archive item"}
      </button>

      {isConfirmOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 backdrop-blur-sm">
          <div className="glass-panel-strong w-full max-w-md rounded-[2rem] p-6 sm:p-7">
            <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-neutral-500">
              Confirm Archive
            </p>

            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
              Archive this item?
            </h3>

            <p className="mt-4 text-sm leading-7 text-neutral-700 sm:text-base">
              <span className="font-semibold text-neutral-950">{itemName}</span>{" "}
              will be archived and hidden from the active closet list.
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
                onClick={handleArchive}
                disabled={isPending}
                className="flex-1 rounded-full bg-[#1659E0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f4cc4] disabled:cursor-not-allowed disabled:bg-[#8aaeea]"
              >
                {isPending ? "Archiving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
