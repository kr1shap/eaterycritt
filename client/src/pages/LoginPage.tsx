import React, { useState } from "react";
import { useNavigate } from "react-router";

type lProp = {
  type: "login" | "signup";
  onSubmit: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ error: string } | { message: string; user_id: number }>;
}

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
    const result = await props.onSubmit(n, em, p);
    
    if ("error" in result) {
      alert(result.error);
    } else {
      navigate(`/`, { state: { user_id: result.user_id } });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-20">
      <img src="../public/eaterycritlogo.png"></img>

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
