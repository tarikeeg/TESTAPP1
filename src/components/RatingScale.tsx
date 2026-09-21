import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface Props {
  label: string;
  value: number | null;
  onChange: (value: number) => void;
  onAdvance: () => void;
  enableKeyboard?: boolean;
}

const POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const ACCENT = '#10b981';

export function RatingScale({ label, value, onChange, onAdvance, enableKeyboard = false }: Props) {
  const selected = value !== null;

  useEffect(() => {
    if (!enableKeyboard) return;
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      }
      const n = Number.parseInt(e.key, 10);
      if (n >= 1 && n <= 9) onChange(n);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enableKeyboard, onChange]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span
          className="text-lg font-semibold tracking-tight transition-colors"
          style={{ color: selected ? ACCENT : '#e5e7eb' }}
        >
          {label}
        </span>
        <button
          type="button"
          onClick={onAdvance}
          disabled={!selected}
          aria-label="Advance"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all disabled:cursor-not-allowed"
          style={
            selected
              ? { backgroundColor: ACCENT, color: '#052e16' }
              : { backgroundColor: '#1f2937', color: '#4b5563' }
          }
        >
          <ArrowRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="grid grid-cols-9 gap-1.5 sm:gap-2">
        {POINTS.map((point) => {
          const active = point === value;
          return (
            <button
              key={point}
              type="button"
              onClick={() => onChange(point)}
              className="flex aspect-square items-center justify-center rounded-xl text-lg font-bold tabular-nums transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={
                active
                  ? { backgroundColor: ACCENT, color: '#052e16' }
                  : { backgroundColor: '#18181b', color: '#d4d4d8' }
              }
              aria-label={`Set ${label} to ${point}`}
              aria-pressed={active}
            >
              {point}
            </button>
          );
        })}
      </div>

      <input
        type="range"
        min={1}
        max={9}
        step={1}
        value={value ?? 5}
        data-selected={selected}
        onChange={(e) => onChange(Number.parseInt(e.target.value, 10))}
        aria-label={label}
        style={{ accentColor: selected ? ACCENT : '#3f3f46' }}
        className="rating-slider mt-3 block h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-800"
      />

      <div className="mt-2 flex justify-between text-[11px] font-medium uppercase tracking-wide text-zinc-500">
        <span>Not at all</span>
        <span>Extremely</span>
      </div>
    </div>
  );
}
