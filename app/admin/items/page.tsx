import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { addItem, archiveItem, markItemAvailable, markItemClaimed } from "./actions";


export const dynamic = "force-dynamic";

type ClosetItem = {
  id: string;
  name: string;
  size: string;
  condition: string;
  category: string;
  status: string | null;
  image_url: string | null;
  created_at: string;
};

type AdminItemsPageProps = {
  searchParams: Promise<{
    key?: string;
  }>;
};

export default async function AdminItemsPage({
  searchParams,
}: AdminItemsPageProps) {
  const params = await searchParams;
  const adminKey = params.key;

  if (adminKey !== process.env.ADMIN_SECRET) {
    return (
      <main className="min-h-screen px-5 py-8 text-neutral-950 sm:px-6 sm:py-12">
        <section className="mx-auto max-w-3xl">
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
              Admin Items
            </p>

            <h1 className="text-4xl font-semibold tracking-[-0.05em] text-neutral-950">
              Access denied, stop playing with me lmao
            </h1>

            <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
              Add your admin key to the URL to manage closet items.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const { data, error } = await supabaseAdmin
    .from("items")
    .select("id, name, size, condition, category, status, image_url, created_at")
    .order("created_at", { ascending: false });

  const items = (data ?? []) as ClosetItem[];

  return (
    <main className="min-h-screen px-5 py-8 text-neutral-950 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-6xl">
        <div className="glass-panel mb-8 rounded-[2rem] p-6 sm:p-8">
          <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
            Admin Item Manager
          </p>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.06em] text-neutral-950 sm:text-6xl">
                Closet Items
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base">
                You can add new items or update existing ones here
              </p>
            </div>

            <a
              href={`/admin?key=${adminKey}`}
              className="w-fit rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Back to requests
            </a>
          </div>
        </div>

        <div className="glass-panel mb-8 rounded-[2rem] p-5 sm:p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
            Add a new item
          </h2>

          <form action={addItem} className="mt-5 grid gap-3 md:grid-cols-2">
            <input
              required
              name="name"
              type="text"
              placeholder="Item name"
              className="rounded-2xl border border-[#ebe4da] bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-950"
            />

            <input
              required
              name="size"
              type="text"
              placeholder="Size"
              className="rounded-2xl border border-[#ebe4da] bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-950"
            />

            <input
              required
              name="condition"
              type="text"
              placeholder="Condition, e.g. Like new"
              className="rounded-2xl border border-[#ebe4da] bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-950"
            />

            <input
              required
              name="category"
              type="text"
              placeholder="Category, e.g. Pants"
              className="rounded-2xl border border-[#ebe4da] bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-950"
            />

            <input
              name="imageUrl"
              type="url"
              placeholder="Image URL optional"
              className="rounded-2xl border border-[#ebe4da] bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-950 md:col-span-2"
            />

            <button
              type="submit"
              className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 md:col-span-2"
            >
              Add item
            </button>
          </form>
        </div>

        {error ? (
          <div className="glass-panel mb-6 rounded-[2rem] p-5 text-sm text-neutral-700">
            {error.message}
          </div>
        ) : null}

        {items.length === 0 ? (
          <div className="glass-panel rounded-[2rem] p-8 text-neutral-700">
            No closet items yet.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="glass-panel group rounded-[2rem] p-4 sm:p-5"
              >
                <div className="relative mb-5 flex aspect-[3/4] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/85 bg-neutral-50">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-sm font-medium text-neutral-400">
                      No photo
                    </span>
                  )}
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

                <div className="mt-5 flex flex-col gap-2">
                  <form action={markItemAvailable.bind(null, item.id)}>
                    <button
                      type="submit"
                      className="w-full rounded-full border border-[#ebe4da] bg-white/70 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-white"
                    >
                      Mark available
                    </button>
                  </form>

                  <form action={markItemClaimed.bind(null, item.id)}>
                    <button
                      type="submit"
                      className="w-full rounded-full bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      Mark claimed
                    </button>
                  </form>
                  <form action={archiveItem.bind(null, item.id)}>
                    <button 
                      type="submit"
                      className="w-full rounded-full bg-[#1659E0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#03045e]"
                    >
                      Archive item
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}