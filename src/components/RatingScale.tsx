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
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-base font-semibold" style={{ color: accent }}>
          {label}
        </span>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
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
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200"
      />

      <div className="mt-3 flex w-full">
        {POINTS.map((point) => {
          const active = point === value;
          return (
            <button
              key={point}
              type="button"
              onClick={() => onChange(point)}
              className="flex flex-1 flex-col items-center gap-1.5 focus:outline-none"
              aria-label={`Set ${label} to ${point}`}
            >
              <span
                className="h-2.5 w-px"
                style={{ backgroundColor: active ? accent : '#d1d5db' }}
              />
              <span
                className="text-xs font-semibold tabular-nums transition-colors"
                style={{ color: active ? accent : '#9ca3af' }}
              >
                {point}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex justify-between text-xs font-medium text-gray-500">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}
