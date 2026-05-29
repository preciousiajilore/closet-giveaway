import { supabaseAdmin } from "@/lib/supabaseAdmin";

type ClothingRequest = {
  id: string;
  item_name: string;
  requester_name: string;
  requester_contact: string;
  message: string | null;
  status: string;
  created_at: string;
};

type AdminPageProps = {
  searchParams: Promise<{
    key?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const adminKey = params.key;

  if (adminKey !== process.env.ADMIN_SECRET) {
    return (
      <main className="min-h-screen bg-[#f4f1eb] px-6 py-10 text-neutral-950">
        <section className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
            Admin
          </p>

          <h1 className="text-4xl font-semibold tracking-[-0.04em]">
            Access denied
          </h1>

          <p className="mt-4 text-neutral-600">
            Add your admin key to the URL to view requests.
          </p>
        </section>
      </main>
    );
  }

  const { data, error } = await supabaseAdmin
    .from("requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-[#f4f1eb] px-6 py-10 text-neutral-950">
        <section className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold">Something went wrong</h1>
          <p className="mt-4 text-neutral-600">{error.message}</p>
        </section>
      </main>
    );
  }

  const requests = data as ClothingRequest[];

  return (
    <main className="min-h-screen bg-[#f4f1eb] px-6 py-10 text-neutral-950">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[2rem] bg-white p-8 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
            Admin Dashboard
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-5xl font-semibold tracking-[-0.05em]">
                Clothing Requests
              </h1>

              <p className="mt-4 text-neutral-600">
                Review who requested each item and follow up with them directly.
              </p>
            </div>

            <div className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white">
              {requests.length} request{requests.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-8 text-neutral-600 shadow-sm">
            No requests yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {requests.map((request) => (
              <article
                key={request.id}
                className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                      {request.status}
                    </p>

                    <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                      {request.item_name}
                    </h2>

                    <div className="mt-4 space-y-2 text-sm text-neutral-700">
                      <p>
                        <span className="font-semibold text-neutral-950">
                          Name:
                        </span>{" "}
                        {request.requester_name}
                      </p>

                      <p>
                        <span className="font-semibold text-neutral-950">
                          Contact:
                        </span>{" "}
                        {request.requester_contact}
                      </p>

                      {request.message && (
                        <p>
                          <span className="font-semibold text-neutral-950">
                            Message:
                          </span>{" "}
                          {request.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-neutral-500">
                    {new Date(request.created_at).toLocaleString()}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}