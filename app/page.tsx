import RequestForm from "@/components/RequestForm";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

type ClothingItem = {
  id: string;
  name: string;
  size: string;
  condition: string;
  category: string;
  status: string | null;
};

async function getItems() {
  const { data, error } = await supabaseAdmin
    .from("items")
    .select("id, name, size, condition, category, status")
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to load items", error);
    return {
      items: [] as ClothingItem[],
      errorMessage: "I couldn't load the closet items right now.",
    };
  }

  return {
    items: (data ?? []) as ClothingItem[],
    errorMessage: "",
  };
}

export default async function Home() {
  const { items, errorMessage } = await getItems();

  return (
    <main className="min-h-screen px-5 py-8 text-neutral-950 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-6xl">
        <div className="glass-panel mb-8 rounded-[2rem] p-6 sm:mb-10 sm:p-8">
          <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
            Closet Giveaway
          </p>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.06em] text-balance text-neutral-950 sm:text-6xl lg:text-7xl">
              Precious&apos; Closet Drop
            </h1>

            <p className="max-w-md text-sm leading-7 text-neutral-600 sm:text-base">
              Browse the pieces I&apos;m giving away and request anything
              you&apos;d genuinely wear.
            </p>
          </div>
        </div>

        {errorMessage ? (
          <div className="glass-panel mb-6 rounded-[2rem] p-5 text-sm text-neutral-700">
            {errorMessage}
          </div>
        ) : null}

        {items.length === 0 ? (
          <div className="glass-panel rounded-[2rem] p-8 text-neutral-700">
            No items are live yet.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="glass-panel group rounded-[2rem] p-4 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_rgba(98,86,73,0.16)] sm:p-5"
              >
                <div className="mb-5 flex aspect-[4/3] items-center justify-center rounded-[1.5rem] border border-white/85 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(243,238,231,0.5))]">
                  <span className="text-sm font-medium text-neutral-400">
                    Photo coming soon
                  </span>
                </div>

                <div className="mb-4 flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
                    {item.name}
                  </h2>

                  <span className="shrink-0 rounded-full border border-white/90 bg-white/60 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-neutral-600">
                    {item.status ?? "Available"}
                  </span>
                </div>

                <div className="space-y-2 text-sm leading-6 text-neutral-700">
                  <p>
                    <span className="mr-2 text-neutral-500">Size</span>
                    {item.size}
                  </p>
                  <p>
                    <span className="mr-2 text-neutral-500">Condition</span>
                    {item.condition}
                  </p>
                  <p>
                    <span className="mr-2 text-neutral-500">Category</span>
                    {item.category}
                  </p>
                </div>

                <RequestForm itemName={item.name} />
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
