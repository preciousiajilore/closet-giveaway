export default function SupportReturnPage() {
  return (
    <main className="min-h-screen px-5 py-8 text-neutral-950 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-3xl">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-10">
          <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
            Support
          </p>

          <h1 className="text-4xl font-semibold tracking-[-0.06em] text-neutral-950 sm:text-6xl">
            Thank you
          </h1>

          <p className="mt-5 text-sm leading-7 text-neutral-600 sm:text-base">
            Thank you for supporting this project. Your checkout session has
            been completed or returned.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/"
              className="rounded-full bg-neutral-950 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Back to closet
            </a>

            <a
              href="/support"
              className="rounded-full border border-[#ebe4da] bg-white/70 px-6 py-3 text-center text-sm font-semibold text-neutral-700 transition hover:bg-white"
            >
              Back to support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}