interface Props {
  label: string;
  accent: string;
  value: number;
  onChange: (value: number) => void;
  leftLabel?: string;
  rightLabel?: string;
}

const POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function RatingScale({
  label,
  accent,
  value,
  onChange,
  leftLabel = 'Not at all',
  rightLabel = 'Extremely',
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">{label}</span>
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white tabular-nums"
          style={{ backgroundColor: accent }}
        >
          {value}
        </span>
      </div>

      <input
        type="range"
        min={1}
        max={9}
        step={1}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        aria-label={label}
        style={{ accentColor: accent }}
        className="block h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-100"
      />

      <div className="mt-2.5 flex w-full justify-between">
        {POINTS.map((point) => {
          const active = point === value;
          return (
            <button
              key={point}
              type="button"
              onClick={() => onChange(point)}
              className="flex w-6 items-center justify-center rounded-md py-0.5 text-xs font-semibold tabular-nums transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
              style={{ color: active ? accent : '#9ca3af' }}
              aria-label={`Set ${label} to ${point}`}
            >
              {point}
            </button>
          );
        })}
      </div>

      <div className="mt-1 flex justify-between text-[11px] font-medium uppercase tracking-wide text-gray-400">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}
