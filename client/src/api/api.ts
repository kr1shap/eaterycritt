const API_URL = "http://127.0.0.1:5000";

export async function signup(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, password }),
    credentials: "include",
  });
  return res.json();
}

export async function logout() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // <- required
  });

  return res.json();
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/@me`, {
    method: "GET",
    credentials: "include", 
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch current user");
  }

  return res.json(); 
}

export async function getRestaurantAll() {
  const res = await fetch(`${API_URL}/restaurants`);
  return res.json();
}

export async function getRestaurant(restID: number) {
  const res = await fetch(`${API_URL}/restaurants/${restID}`);
  return res.json();
}

export async function getReviews(restID: number) {
  const res = await fetch(`${API_URL}/restaurants/${restID}/reviews`);
  return res.json();
}

export async function submitReview(
  restID: number, user_id: number,
  rating: number,
  comment: string
) {
  const res = await fetch(`${API_URL}/restaurants/${restID}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating, comment, user_id }),
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to submit review");
  }
  return res.json();
}

export async function getAvgRating(restID: number) {
  const res = await fetch(`${API_URL}/restaurants/${restID}/avgRating`);
  return res.json();
}

export async function getUser(user_id: number) {
  const res = await fetch(`${API_URL}/users/${user_id}`);
  return res.json();
}
//Test function b/c login manager is being not nice!!!
export async function whoami() {
  const res = await fetch(`${API_URL}/whoami`, {
    method: "GET",
    credentials: "include", 
  });

  const data = await res.json();
  console.log(data);
}