import { type Restaurant } from "../schema/schema";

type rProp = {
  Rest: Restaurant;
  avgR?: number;
  //add more later if needed
};

function RestaurantCardL(props: rProp) {
  return (
    <div
      className="bg-[#fdfff6] border-4 border-gray-900
             w-full max-w-7xl mx-auto mt-7
             px-10 py-10 sm:px-10 sm:py-10
             flex flex-col gap-8 items-center text-center
             rounded-4xl"
    >
      {/* Restaurant name */}
      <h1 className="font-bold text-black text-xl sm:text-3xl">
        {props.Rest.name}
      </h1>

      {/* Average Rating */}
      <p className="font-semibold text-yellow-600 text-xl sm:text-2xl">
        ⭐ Average Rating:{" "}
        {props.avgR !== undefined ? props.avgR.toFixed(1) : "No ratings yet"}
      </p>

      {/* Cuisine + Location */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-12">
        <span className="text-gray-800 font-medium text-lg sm:text-2xl">
          🍽 {props.Rest.cuisine}
        </span>
        <span className="text-gray-600 text-md sm:text-xl italic">
          📍 {props.Rest.location}
        </span>
      </div>

      
    </div>
  );
}

export default RestaurantCardL;
