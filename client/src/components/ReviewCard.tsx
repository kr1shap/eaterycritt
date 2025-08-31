import { type Review, type User } from "../schema/schema";

type rProp = {
  ReviewInfo: Review;
  User: User | undefined;
  //add more later if needed
};

function ReviewCard(props: rProp) {
  return (
    <div
      className="bg-[#f5f5d3] rounded-2xl p-6 mb-4 border-2 border-gray-950
      w-full sm:w-[22rem] lg:w-[28rem] flex-col flex"
    >
      <div className="flex justify-between items-center">
        <span className="font-bold text-black text-md sm:text-xl">
          {props.User?.name ? props.User.name : "No Username"}
        </span>
        <span className="text-yellow-500 font-semibold text-md sm:text-xl">
          ★  {props.ReviewInfo.rating}
        </span>
      </div>
      <p className="text-gray-600 leading-relaxed text-[0.5rem]">{props.ReviewInfo.created_at}</p>
      <p className="text-gray-800 mt-3 leading-relaxed text-sm sm:text-md">
        {props.ReviewInfo.comment}
      </p>
    </div>
  );
}

export default ReviewCard;
