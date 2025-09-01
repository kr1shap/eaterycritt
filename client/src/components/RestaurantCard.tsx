import { type Restaurant } from "../schema/schema";

type rProp = {
  Rest: Restaurant;
  avgR?: number;
  onClick?: () => void;
  //add more later if needed
};

function RestaurantCard(props: rProp) {
  return (
    <div
      className="bg-[#f7f7f7] shadow rounded-2xl p-4 mb-3  border-2 border-gray-950
                 flex flex-col justify-between items-start
                 min-w-3xs w-[40vw] hover:shadow-xl duration-300 hover:translate-y-1"
      onClick={props.onClick}
    >
      <span className="font-bold text-black text-md sm:text-xl">
        {props.Rest.name}
      </span>
      <p className="font-light text-gray-700 text-[0.6rem]">
        Average Rating:{" "}
        {props.avgR !== undefined ? props.avgR : "No average rating"}
      </p>

      <div className="flex flex-row justify-between items-center w-full mt-1">
        <span className="text-gray-700 font-medium text-md">
          {props.Rest.cuisine}
        </span>
        <span className="text-gray-500 text-sm italic">
          {props.Rest.location}
        </span>
      </div>
    </div>
  );
}

export default RestaurantCard;
