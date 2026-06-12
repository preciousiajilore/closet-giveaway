const coffeeLink = process.env.NEXT_PUBLIC_STRIPE_COFFEE_LINK;

export default function SupportPage() {
  return (
    <main className="min-h-screen px-5 py-8 text-neutral-950 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-4xl">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-10">
          <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
            Support
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.06em] text-neutral-950 sm:text-6xl">
            Buy me a coffee
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
            I built this closet giveaway app as a small full-stack project to
            make sharing clothes easier. If you found it useful or want to
            support my learning, you can buy me a coffee here.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {coffeeLink ? (
              <a
                href={coffeeLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-neutral-950 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Buy me a coffee
              </a>
            ) : (
              <p className="rounded-2xl border border-neutral-200 bg-white/70 px-5 py-4 text-sm text-neutral-600">
                Payment link is not configured yet.
              </p>
            )}

            <a
              href="/"
              className="rounded-full border border-[#ebe4da] bg-white/70 px-6 py-3 text-center text-sm font-semibold text-neutral-700 transition hover:bg-white"
            >
              Back to closet
            </a>
          </div>
        </div>

        <div className="glass-panel mt-6 rounded-[2rem] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
            Why I added this
          </h2>

          <p className="mt-4 text-sm leading-7 text-neutral-700 sm:text-base">
            This page is also a small payments-focused feature I added to learn
            by building. It connects the project to a real Stripe-hosted payment
            flow and gave me a chance to work through payment UX, environment
            variables, deployment configuration, and checkout redirection.
          </p>
        </div>
      </section>
    </main>
  );
}