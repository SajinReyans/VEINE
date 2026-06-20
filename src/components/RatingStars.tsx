interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

export function RatingStars({ rating, size = 14, showValue = true, reviewCount }: RatingStarsProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-flex items-center" style={{ gap: 1 }}>
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <svg
              key={i}
              width={size}
              height={size}
              viewBox="0 0 20 20"
              fill={filled ? "var(--color-clay-500)" : "none"}
              stroke="var(--color-clay-500)"
              strokeWidth={1.2}
            >
              <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77l-5.18 2.67.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
            </svg>
          );
        })}
      </span>
      {showValue && <span className="text-xs font-medium text-basalt-700">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && <span className="text-xs text-stone-500">({reviewCount})</span>}
    </span>
  );
}
