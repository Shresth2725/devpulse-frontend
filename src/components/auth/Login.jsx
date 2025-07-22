import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utilis/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utilis/constant";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    if (error) setError("");
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    if (error) setError("");
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  const toggleLoginSignin = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        baseUrl + "/login",
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Something went wrong";
      setError(errorMsg);
      // navigate("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        baseUrl + "/signup",
        {
          firstName,
          lastName,
          emailId: email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Something went wrong";
      setError(errorMsg);
      // navigate("/error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card w-96 bg-base-300 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold pb-2">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLogin && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    What is your First Name?
                  </legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    onChange={handleFirstName}
                    value={firstName}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    What is your Last Name?
                  </legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    onChange={handleLastName}
                    value={lastName}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is your Email?</legend>
              <input
                type="email"
                className="input"
                placeholder="Type here"
                onChange={handleEmailInput}
                value={email}
                autoComplete="email"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                What is your Password?
              </legend>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input pr-15"
                  placeholder="Type here"
                  onChange={handlePasswordInput}
                  value={password}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 hover:text-blue-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </fieldset>
          </div>
          {error && <p className="text-red-500 font-bold pt-2">{error}</p>}
          <div className="justify-center card-actions pt-4">
            {isLogin ? (
              <button
                className="btn btn-primary"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleSignIn}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            )}
          </div>
          <p className="text-center text-gray-600 mt-3">
            {isLogin ? "New user?" : "Already have an account?"}{" "}
            <span
              onClick={toggleLoginSignin}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
