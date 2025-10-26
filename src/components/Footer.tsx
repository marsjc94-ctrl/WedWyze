export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-brand.ink/80 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} WedWyze</p>
        <p>One single pane of glass — one source of truth.</p>
      </div>
    </footer>
  );
}
