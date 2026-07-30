type SearchBoxProps = {
  defaultValue?: string;
  compact?: boolean;
};

export function SearchBox({ defaultValue = "", compact = false }: SearchBoxProps) {
  return (
    <form
      action="/search"
      className={`flex w-full flex-col gap-3 rounded-[2rem] border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/10 sm:flex-row ${
        compact ? "max-w-3xl" : "max-w-4xl"
      }`}
    >
      <label className="sr-only" htmlFor="q">
        Search for a task
      </label>
      <input
        id="q"
        name="q"
        defaultValue={defaultValue}
        placeholder='Try "help moving" or "French tutoring"'
        className="min-h-14 flex-1 rounded-full px-5 text-base font-medium text-slate-950 outline-none placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="min-h-14 rounded-full bg-slate-950 px-7 text-base font-black text-white transition hover:bg-teal-700"
      >
        Search
      </button>
    </form>
  );
}
