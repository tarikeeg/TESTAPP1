import { useEffect } from 'react';
import { Check } from 'lucide-react';

interface Props {
  label: string;
  accent: string;
  value: number | null;
  onChange: (value: number) => void;
  leftLabel?: string;
  rightLabel?: string;
  enableKeyboard?: boolean;
}

const POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function RatingScale({
  label,
  accent,
  value,
  onChange,
  leftLabel = 'Not at all',
  rightLabel = 'Extremely',
  enableKeyboard = false,
}: Props) {
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

  const selected = value !== null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-gray-900">{label}</span>
          {selected && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-3.5 w-3.5" strokeWidth={3} aria-label="Rated" />
            </span>
          )}
        </div>
        <span
          className="flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-base font-bold tabular-nums"
          style={
            selected
              ? { backgroundColor: accent, color: '#ffffff' }
              : { backgroundColor: '#f3f4f6', color: '#9ca3af' }
          }
        >
          {selected ? value : '–'}
        </span>
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
        style={{ accentColor: selected ? accent : '#d1d5db' }}
        className="rating-slider block h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200"
      />

      <div className="mt-4 grid grid-cols-9 gap-1.5 sm:gap-2">
        {POINTS.map((point) => {
          const active = point === value;
          return (
            <button
              key={point}
              type="button"
              onClick={() => onChange(point)}
              className="flex aspect-square items-center justify-center rounded-lg border text-sm font-bold tabular-nums transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 sm:text-base"
              style={
                active
                  ? { backgroundColor: accent, borderColor: accent, color: '#ffffff' }
                  : { backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#4b5563' }
              }
              aria-label={`Set ${label} to ${point}`}
              aria-pressed={active}
            >
              {point}
            </button>
          );
        })}
      </div>

      <div className="mt-2.5 flex justify-between text-[11px] font-medium uppercase tracking-wide text-gray-400">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}
