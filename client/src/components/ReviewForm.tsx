import React, { useState } from "react";
import { type User } from "../schema/schema.ts";

interface fProp {
  onSubmit: (rating: number, comment: string) => Promise<void>;
  user: User | undefined | null; 
}

function ReviewForm(props: fProp) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim() !== "") {
      console.log(rating, comment);
      props.onSubmit(rating, comment);
      setRating(0);
      setComment("");
    } else {
      alert("Provide a rating and comment!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#ffffed] rounded-2xl
                 w-full max-w-3xl mx-auto p-6 flex flex-col gap-5
                 items-start text-left sm:p-8 sm:gap-6 border-4 border-gray-900"
    >
      {/* User name / heading */}
      <span className="font-bold text-black text-xl sm:text-2xl mb-2">
        {props.user?.name ? props.user.name : "Username"}'s Review
      </span>

      {/* Rating selector */}
      <div className="flex gap-3 items-center">
        <label className="text-gray-700 font-medium">Rating:</label>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        >
          <option value={0}>Select</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Comment textarea */}
      <textarea
        className="w-full rounded-lg p-3 text-gray-800 resize-none
                   focus:outline-none border-2 border-gray-900"
        rows={5}
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-[#efefa6] hover:bg-[#e0e05f] text-black font-bold px-6 py-3 rounded-3xl transition
                   self-end border-2 "
      >
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;
