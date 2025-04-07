interface RatingProps {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
}

export const Rating = ({ rating, reviewCount, showCount = true }: RatingProps) => {
  // Create an array of 5 stars
  const stars = Array(5).fill(0);

  return (
    <div className="flex items-center">
      <div className="rating-stars text-sm text-amber-500">
        {stars.map((_, index) => (
          <span key={index}>
            {index < rating ? "★" : "☆"}
          </span>
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="ml-2 text-gray-600 text-sm">
          ({rating.toFixed(1)}) • {reviewCount} reviews
        </span>
      )}
      {showCount && reviewCount === undefined && (
        <span className="ml-1 text-gray-600 text-sm">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};
