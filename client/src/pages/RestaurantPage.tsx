import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import {
  getRestaurant,
  getReviews,
  getAvgRating,
  getUser,
  submitReview,
} from "../api/api.ts";
import type { Restaurant, Review, User } from "../schema/schema.ts";
import RestaurantCardL from "../components/RestaurantCardL.tsx";
import ReviewCard from "../components/ReviewCard.tsx";
import Button from "../components/Button.tsx";
import Overlay from "../components/Overlay.tsx";

function RestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState<number>(0);
  const location = useLocation();
  const { user_id } = (location.state as { user_id?: number }) || {};
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id) return;

    getRestaurant(Number(id)).then(setRestaurant);
    getReviews(Number(id)).then(setReviews);
    getAvgRating(Number(id)).then((data) =>
      setAvgRating(data.average_rating ?? 0)
    );

    if (!user_id) return;

    getUser(user_id).then(setUser); // fetch user object by id
  }, [user_id]);

  useEffect(() => {
    async function fetchUsers() {
      const uniqueIds = [...new Set(reviews.map((r) => r.user_id))];
      const userMap: Record<number, User> = {};
      for (const uid of uniqueIds) {
        userMap[uid] = await getUser(uid);
      }
      setUsers(userMap);
    }

    if (reviews.length > 0) {
      fetchUsers();
    }

    getAvgRating(Number(id)).then((data) =>
      setAvgRating(data.average_rating ?? 0)
    );
  }, [reviews]);

  const handleReviewSubmit = async (rating: number, comment: string) => {
    console.log("review:", rating, comment, restaurant?.id, user_id);
    try {
      await submitReview(restaurant?.id ?? 1, user_id ?? 1, rating, comment);
      alert("Review submitted successfully!");

      // update UI
      if (user && restaurant) {
        const newReview: Review = {
          id: Date.now(), //temp (as update will have same date)
          restaurant_id: restaurant.id,
          user_id: user.id,
          rating,
          comment,
          created_at: new Date().toISOString(),
        };
        setReviews((prev) => [...prev, newReview]); //Append
      }
    } catch (err: any) {
      console.error(err.message);
      alert(err.message);
    }

    setShowModal(false);
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-[#fefefd] flex flex-col sm:flex-row items-center">
      <div
        className="mr-6 w-full sm:w-[50%] h-[100vh] flex flex-col items-center justify-center
                bg-gradient-to-r from-[#fefbde] to-transparent"
      >
        <RestaurantCardL Rest={restaurant} avgR={avgRating} />
        {user && (
          <Button name="Write a review!" onClick={() => setShowModal(true)} />
        )}
      </div>
      <div className="w-full sm:w-3/5 flex flex-col items-center">
        <div className="w-full max-h-[85vh] overflow-y-auto p-2 space-y-4">
          {reviews.map((r) => (
            <ReviewCard key={r.id} ReviewInfo={r} User={users[r.user_id]} />
          ))}
        </div>
      </div>
      {showModal && (
        <Overlay
          onSubmit={handleReviewSubmit}
          onClose={() => setShowModal(false)}
          user={user}
        />
      )}
    </div>
  );
}

export default RestaurantPage;
