import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
const LoginScreen = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage("Username and password are required");
      return;
    }
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one special character, and one number."
      );
      return;
    }
    setErrorMessage("");
    history.push("/movies");
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1  text-white">
        <img
          src="https://app.digisquares.com/static/media/Tablet%20login.915f681359d679bc0216.gif"
          alt="Login related"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg overflow-hidden shadow-lg p-6 relative">
          <div className="py-4 text-center">
            <h2 className="text-2xl font-bold">Login</h2>
          </div>
          <div className="px-6 py-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="w-full border rounded-md py-2 px-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mt-4 mb-2"
            >
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border rounded-md py-2 px-3 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="h-6 w-6 text-gray-500" />
                ) : (
                  <EyeOffIcon className="h-6 w-6 text-gray-500" />
                )}
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
          <div className="flex justify-center pb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
