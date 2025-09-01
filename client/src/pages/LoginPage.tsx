import React, { useState } from "react";
import { useNavigate } from "react-router";

type lProp = {
  type: "login" | "signup";
  onSubmit: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ error: string } | { message: string; user_id: number }>;
};

function LoginPage(props: lProp) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const p = password.trim();

    if (props.type === "signup") {
      if (n && em && p) {
        const result = await props.onSubmit(n, em, p);
        if ("error" in result) {
          alert(result.error);
        } else {
          console.log(result);
          navigate(`/`, { state: { user_id: result.user_id } });
        }
      } else {
        alert("Please fill in all fields");
      }
      return;
    }

    if (props.type === "login") {
      if (em && p) {
        const result = await props.onSubmit("", em, p); 
        if ("error" in result) {
          alert(result.error);
        } else {
          console.log(result);
          navigate(`/`, { state: { user_id: result.user_id } });
        }
      } else {
        alert("Please fill in all fields");
      }
      return;
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-20">
      <div className="flex flex-col justify-center gap-3 items-center align-middle">
        <img
          className="w-[200px] h-[200px] sm:w-[18vw] sm:h-[18vw]"
          src="../public/eaterycritlogo.png"
        ></img>
        <p className="text-5xl font-black text-[#4c531b]">EATERYCRIT</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full md:w-[30vw] p-6 rounded-xl shadow-lg bg-white/80 gap-4 border-2 border-[#5d5a00a6]"
      >
        <div className="w-full flex flex-col justify-center align-middle items-center gap-10">
          <p className="w-full text-md sm:text-xl font-bold text-[#5d5a00]">
            {props.type === "signup" ? "SIGNUP" : "LOGIN"}
          </p>
          <div className="w-full flex flex-col justify-center gap-8">
            {props.type === "signup" && (
              <input
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-[#5b5c01cd] p-2 px-3 rounded-full "
              />
            )}
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-[#5b5c01cd] p-2 px-3 rounded-full"
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-[#5b5c01cd] p-2 px-3 rounded-full"
            />
          </div>
          <button className="bg-[#eaeaea] hover:bg-[#687a0f] hover:text-[#fffff4] text-[#687a0f] font-bold py-2 rounded-full w-full transition ease-in-out">
            {props.type === "login" ? "Login" : "Signup"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
