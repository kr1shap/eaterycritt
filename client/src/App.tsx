import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import RestaurantPage from "./pages/RestaurantPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { signup, login } from "./api/api.ts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants/:id" element={<RestaurantPage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              type="login"
              onSubmit={async (name, email, password) => {
                const res = await login(email, password);
                return res; 
              }}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <LoginPage
              type="signup"
              onSubmit={async (name, email, password) => {
                const res = await signup(name, email, password);
                return res; 
              }}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
