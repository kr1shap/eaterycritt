import { Utensils, Map } from "lucide-react";
import { type Restaurant } from "../schema/schema";
import RatingStars from "./RatingStar";

type rProp = {
  Rest: Restaurant | null;
  avgR?: number;
  //add more later if needed
};

function RestaurantCardL(props: rProp) {
  const openMap = (add: string | undefined) => {
    if (add) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        add
      )}`;
      window.open(url, "_blank"); // new tab
    }
  };

  return (
    <div
      className="w-full max-w-7xl mx-auto mt-7
             px-10 py-10 sm:px-10 sm:py-10
             flex flex-col gap-8 items-center text-center bg-none"
    >
      {/* rest name */}
      <h1 className="font-bold text-black text-4xl sm:text-6xl ">
        {props.Rest?.name}
      </h1>

      {/* avg rating */}
      <div className="font-semibold text-[#d3d36c] text-xl sm:text-2xl gap-3 flex flex-col">
        <RatingStars rating={props.avgR !== undefined ? Number(props.avgR.toFixed(1)) : 0} />
        {props.avgR !== undefined ? props.avgR.toFixed(1) : "No ratings yet"}
      </div>

      {/* cusine and loc */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-12">
        <div className="text-gray-800 flex flex-col font-medium text-lg sm:text-2xl align-middle items-center">
          <Utensils size={20} />
          <span>{props.Rest?.cuisine}</span>
        </div>

        <div className="text-gray-800 flex flex-col font-medium text-lg sm:text-2xl align-middle items-center hover:text-[#a3a349] transition duration-300">
          <Map size={25} />
          <span
            className="text-md sm:text-xl italic"
            onClick={() => openMap(props.Rest?.location ?? undefined)}
          >
            {props.Rest?.location}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCardL;
