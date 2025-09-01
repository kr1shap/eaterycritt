import { Star } from "lucide-react";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={30}
          className={i < rating ? "fill-[#d3d36c] text-[#d3d36c]" : "text-gray-300/70"}
        />
      ))}
    </div>
  );
}

export default RatingStars;