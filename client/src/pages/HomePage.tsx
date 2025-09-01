import { useEffect, useState } from "react";
import { getRestaurantAll, getAvgRating, getUser, logout } from "../api/api.ts";
import RestaurantCard from "../components/RestaurantCard";
import type { Restaurant } from "../schema/schema.ts";
import { useLocation, useNavigate } from "react-router";
import type { User, Filter } from "../schema/schema.ts";
import Button from "../components/Button.tsx";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

function HomePage() {
  //usestate
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [user, setUser] = useState<User>();
  const [filter, setFilter] = useState<Filter>("none");

  //use loc and nav to get state
  const location = useLocation();
  const navigate = useNavigate();
  const { user_id } = location.state as { user_id: number };

  const handleLogout = async () => {
    const data = await logout();
    console.log(data.message);
    navigate("/login");
  };

  useEffect(() => {
    //Set filter to none (precautionary)
    setFilter("none");

    getRestaurantAll().then(async (data) => {
      setRestaurants(data);

      const avgDataArr = await Promise.all(
        data.map((r: Restaurant) => getAvgRating(Number(r.id)))
      );

      const avgRatingsDict: Record<string, number> = {};
      data.forEach((r: Restaurant, idx: number) => {
        avgRatingsDict[r.id] = avgDataArr[idx].average_rating ?? 0;
      });

      setRatings(avgRatingsDict);
    });

    //get user info
    getUser(user_id).then(setUser);
    console.log(user);

    console.log(ratings);
  }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-[#fefefd] flex flex-col items-center">
      {/* 'User title' div */}
      <div className="w-full pt-20 pb-30 flex flex-col justify-center items-center">
        <motion.div
          className="w-full flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-8xl font-black text-shadow-black">Welcome,</p>
          <p className="text-8xl font-black text-shadow-black hover:text-[#676d06] transition duration-300 ease-in-out">
            {user?.name ?? "No name"}
          </p>
        </motion.div>
        <div className="text-gray-900 text-xs">
          <Typewriter
            options={{
              strings: ["Hope you're doing well, today"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        {/* <p className="text-gray-900 text-xs">Hope you're doing well, today.</p> */}
      </div>
      {/* restaurants, logout stuff */}
      <div className="w-full flex flex-col items-start justify-center px-10 gap-5 sm:flex-row">
        <div className="w-full sm:w-2/5 flex flex-col items-center justify-center align-middle gap-6">
          <img
            src="../public/eaterycritlogo.png"
            className="w-[50vw] sm:w-70 h-auto items-center align-middle mt-10"
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
          <div className="w-full flex flex-row justify-center align-middle items-center gap-10">
            <Button name="lowest" onClick={() => setFilter("lowest")} />
            <Button name="highest" onClick={() => setFilter("highest")} />
          </div>
          {restaurants
            .sort(
              (a: Restaurant, b: Restaurant) => filter==="lowest" ? (ratings[a.id] - ratings[b.id]) : -(ratings[a.id] - ratings[b.id])
            )
            .map((r) => (
              <RestaurantCard
                key={r.id}
                Rest={r}
                avgR={ratings[r.id]}
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
