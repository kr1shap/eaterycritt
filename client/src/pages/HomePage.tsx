import { useEffect, useState } from "react";
import { getRestaurantAll, getAvgRating, getUser, logout } from "../api/api.ts";
import RestaurantCard from "../components/RestaurantCard";
import type { Restaurant } from "../schema/schema.ts";
import { useLocation, useNavigate } from "react-router";
import { type User } from "../schema/schema.ts";
import Button from "../components/Button.tsx";

function HomePage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const location = useLocation();
  const { user_id } = location.state as { user_id: number };
  const [user, setUser] = useState<User>();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const data = await logout();
    console.log(data.message);
    navigate("/login");
  };

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
      <div className="w-full pt-20 pb-30 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col sm:flex-row justify-center items-center">
          <p className="text-8xl font-black text-shadow-black">Welcome,</p>
          <p className="text-8xl font-black text-shadow-black hover:text-[#676d06] transition ease-in-out">
            {user?.name ?? "No name"}
          </p>
        </div>
        <p className="text-gray-900 text-xs">Hope you're doing well, today.</p>
      </div>
      {/* Left part */}
      <div className="w-full flex flex-col items-start justify-center px-10 gap-5 sm:flex-row">
        <div className="w-full sm:w-2/5 flex flex-col items-center justify-center gap-6">
          <img
            src="../public/eaterycritlogo.png"
            className="w-[50vw] sm:w-70 h-auto"
          />
          <Button
            name=" &nbsp; &nbsp; &nbsp; &nbsp;LOGOUT &nbsp; &nbsp; &nbsp; &nbsp;"
            onClick={async () => {
              handleLogout();
            }}
          />
        </div>

        <div className="w-full sm:w-3/5 flex flex-col items-center gap-6 overflow-y-scroll">
          <p className="w-full text-black font-bold text-center text-2xl">
            ALL RESTAURANTS
          </p>
          {restaurants.map((r, idx) => (
            <RestaurantCard
              key={r.id}
              Rest={r}
              avgR={ratings[idx]}
              onClick={() =>
                navigate(`/restaurants/${r.id}`, {
                  state: { user_id: user_id },
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
