import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

const Login = () => {
  const [username, setusername] = useState("rahul");
  const [password, setpassword] = useState("rahul@2021");
  const [showPassword, setShowPassword] = useState(false);
  const [showSubmitError, setshowSubmitError] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      Cookies.set("jwt_token", data.jwt_token, {
        expires: 30,
        path: "/",
      });
      navigate("/");
    } else {
      setshowSubmitError(true);
      seterrorMsg(data.error_msg);
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-[#121212] h-screen flex items-center justify-center px-4">
      <div className="bg-[#1e1e1e] w-[400px] rounded-2xl px-8 py-10 shadow-xl shadow-black/30 flex flex-col items-center gap-8">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="Jobby logo"
          className="h-10 opacity-90"
        />

        <form className="w-full flex flex-col gap-5" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="username"
              className="uppercase text-gray-300 text-sm"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              placeholder="Enter your username"
              className="w-full h-10 mt-2 rounded-md bg-[#2c2c2c] text-white px-3 
                         border border-gray-600 focus:outline-none focus:ring-1 
                         focus:ring-indigo-500 transition-all duration-200"
            />
            <p className="text-gray-400 text-sm mt-1">test-username: rahul</p>
          </div>

          <div>
            <label
              htmlFor="password"
              className="uppercase text-gray-300 text-sm"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-10 mt-2 rounded-md bg-[#2c2c2c] text-white px-3 pr-10
               border border-gray-600 focus:outline-none focus:ring-1 
               focus:ring-indigo-500 transition-all duration-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white mt-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="text-gray-400 text-sm mt-1">
              test-password: rahul@2021
            </p>
          </div>

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 h-10 rounded-lg 
                       text-white font-medium w-full mt-2 transition-all duration-200
                       shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/40"
          >
            Login
          </button>

          {showSubmitError && (
            <p className="text-red-500 text-sm mt-2">*{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
