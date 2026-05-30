import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

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
      <main className="min-h-screen px-5 py-8 text-neutral-950 sm:px-6 sm:py-12">
        <section className="mx-auto max-w-3xl">
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
              Admin
            </p>

            <h1 className="text-4xl font-semibold tracking-[-0.05em] text-neutral-950">
              Access denied
            </h1>

            <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
              Add your admin key to the URL to view clothing requests.
            </p>
          </div>
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
      <main className="min-h-screen px-5 py-8 text-neutral-950 sm:px-6 sm:py-12">
        <section className="mx-auto max-w-3xl">
          <div className="glass-panel rounded-[2rem] p-8">
            <h1 className="text-3xl font-semibold tracking-[-0.04em]">
              Something went wrong
            </h1>

            <p className="mt-4 text-neutral-600">{error.message}</p>
          </div>
        </section>
      </main>
    );
  }

  const requests = (data ?? []) as ClothingRequest[];

  return (
    <main className="min-h-screen px-5 py-8 text-neutral-950 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-6xl">
        <div className="glass-panel mb-8 rounded-[2rem] p-6 sm:p-8">
          <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
            Admin Dashboard
          </p>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.06em] text-neutral-950 sm:text-6xl">
                Clothing Requests
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base">
                Review who requested each item and follow up with them directly.
              </p>
            </div>

            <div className="w-fit rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white">
              {requests.length} request{requests.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="glass-panel rounded-[2rem] p-8 text-neutral-700">
            No requests yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {requests.map((request) => (
              <article
                key={request.id}
                className="glass-panel rounded-[2rem] p-5 sm:p-6"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                      {request.status}
                    </p>

                    <h2 className="text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
                      {request.item_name}
                    </h2>

                    <div className="mt-4 space-y-2 text-sm leading-6 text-neutral-700">
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

                      {request.message ? (
                        <p>
                          <span className="font-semibold text-neutral-950">
                            Message:
                          </span>{" "}
                          {request.message}
                        </p>
                      ) : null}
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