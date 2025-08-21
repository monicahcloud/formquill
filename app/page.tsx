export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <section className="text-center">
        <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium">
          New • {`"Smart forms, simpler work."`}
        </span>
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight">
          Forms + Flows, <span className="text-primary">now with AI</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {`FormQuill`} lets you generate a form from a prompt, publish in
          minutes, and see where people drop off—classic or conversational.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <a
            href="/signup"
            className="rounded-xl bg-primary text-white px-5 py-3 font-semibold">
            Start free
          </a>
          <a
            href="/templates"
            className="rounded-xl border px-5 py-3 font-semibold">
            View templates
          </a>
        </div>
      </section>
    </main>
  );
}
