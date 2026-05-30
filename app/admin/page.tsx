import RequestForm from "@/components/RequestForm";
import { supabase } from "@/lib/supabase";


type ClosetItem = {
  id: string;
  name: string;
  size: string;
  condition: string;
  category: string;
  status: string;
  image_url: string | null;
};


export default async function Home() {
  const { data: clothes, error } = await supabase
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-[#f4f1eb] px-6 py-12 text-neutral-950">
        <section className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
            Closet Giveaway
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em]">
            Something went wrong
          </h1>
          <p className="mt-4 text-neutral-600">{error.message}</p>
        </section>
      </main>
    );
  }

  const items = clothes as ClosetItem[];

  return (
    <main className="min-h-screen bg-[#f4f1eb] px-6 py-12 text-neutral-950">
      <section className="mx-auto max-w-6xl">
        <div className="mb-12 rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
            Closet Giveaway
          </p>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
              Precious&apos; Closet Drop
            </h1>

            <p className="max-w-md text-base leading-7 text-neutral-600">
              Browse the pieces I&apos;m giving away and request anything
              you&apos;d genuinely wear.
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-8 text-neutral-600 shadow-sm">
            No closet items available right now.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-[2rem] border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex aspect-[4/3] items-center justify-center rounded-[1.5rem] border border-white bg-neutral-50">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-full w-full rounded-[1.5rem] object-cover"
                    />
                  ) : (
                    <span className="text-sm text-neutral-400">
                      Photo coming soon
                    </span>
                  )}
                </div>

                <div className="mb-4 flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-semibold tracking-[-0.04em]">
                    {item.name}
                  </h2>

                  <span className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-600 shadow-sm">
                    {item.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-neutral-600">
                  <p>
                    <span className="mr-3 text-neutral-500">Size</span>
                    <span className="text-neutral-800">{item.size}</span>
                  </p>

                  <p>
                    <span className="mr-3 text-neutral-500">Condition</span>
                    <span className="text-neutral-800">{item.condition}</span>
                  </p>

                  <p>
                    <span className="mr-3 text-neutral-500">Category</span>
                    <span className="text-neutral-800">{item.category}</span>
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