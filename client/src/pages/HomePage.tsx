import { useEffect, useState } from "react";
import { getRestaurantAll, getAvgRating, getUser, logout } from "../api/api.ts";
import RestaurantCard from "../components/RestaurantCard";
import type { Restaurant } from "../schema/schema.ts";
import { useLocation } from "react-router";
import { type User } from "../schema/schema.ts";
import Button from "../components/Button.tsx";

function HomePage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const location = useLocation();
  const { user_id } = location.state as { user_id: number };
  const [user, setUser] = useState<User>();


  useEffect(() => {
    getRestaurantAll().then(async (data) => {
      setRestaurants(data);

      //For each iteration, fetch the average rating
      const avgDataArr = await Promise.all(
        data.map((r: Restaurant) => getAvgRating(r.id))
      );
      const avgRatings = avgDataArr.map((d) => d.average_rating ?? 0);
      setRatings(avgRatings);
    });

    //Fetch user information
    getUser(user_id).then(setUser);
    console.log(user);

    console.log(ratings);
  }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-[#fefefd] flex flex-col items-center">
      {/* 'User title' div */}
      <div className="w-full pt-20 pb-10 flex flex-col sm:flex-row justify-center items-center">
        <p className="text-8xl font-black text-shadow-black">Welcome,</p>
        <p className="text-8xl font-black text-shadow-black hover:text-amber-900 transition">
          {user?.name ?? "No name"}
        </p>
      </div>

      {/* Other content */}
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col items-center justify-center align-middle">
            <img src="../public/eaterycritlogo.png"></img>
            <Button name="LOGOUT" dest="/login" onClick={ () => {console.log(logout())}}/>
        </div>
        <div className="w-full flex flex-col items-center gap-6">
          {restaurants.map((r, idx) => (
            <RestaurantCard key={r.id} Rest={r} avgR={ratings[idx]} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
