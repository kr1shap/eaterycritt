import { type Review, type User } from "../schema/schema";
import {formatDate} from "../api/utils.ts"

type rProp = {
  ReviewInfo: Review;
  User: User;
  //add more later if needed
};

function ReviewCard(props: rProp) {
  return (

    <div
      className="bg-[#f5f5d3] rounded-2xl p-6 mb-4 border-2 border-gray-950
      w-[90%] sm:flex-row flex text-left justify-between hover:shadow-xl duration-300 hover:translate-y-0.5 items-center align-middle"
    >
      <div className="flex flex-col text-left justify-center  max-w-[70%]">
        <span className="font-bold text-black text-md sm:text-xl text-left">
          {props.User?.name ? props.User.name : "No Username"}
        </span>
        <p className="text-gray-600 leading-relaxed text-[0.5rem] text-left">
          {formatDate(props.ReviewInfo.created_at)}
        </p>
        <p className="text-gray-800 mt-3 leading-relaxed text-sm sm:text-md text-left w-full">
          {props.ReviewInfo.comment}
        </p>
      </div>
        <span className="text-[#d3d36c] font-semibold text-3xl sm:text-5xl hover:text-[#aaaa52] duration-300">
          {props.ReviewInfo.rating < 2.5 ? "☆" :  "★" } {props.ReviewInfo.rating }
        </span>
    </div>
  );
}

export default ReviewCard;
