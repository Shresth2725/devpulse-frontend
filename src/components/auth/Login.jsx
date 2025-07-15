import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utilis/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utilis/constant";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("Shresth");
  const [lastName, setLastName] = useState("Srivastava");
  const [email, setEmail] = useState("Shresth@gmail.com");
  const [password, setPassword] = useState("Shresth@1234");
  const [error, setError] = useState("");

  const handleFirstName = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };

  const handleLastName = (e) => {
    const value = e.target.value;
    setLastName(value);
  };

  const handleEmailInput = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const toggleLoginSignin = () => {
    setIsLogin(!isLogin);
  };

  const handlePasswordInput = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        baseUrl + "/login",
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        baseUrl + "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      // console.log(res.data.data);
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card w-96 bg-base-300 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold pb-2">
            Login
          </h2>
          <div>
            {!isLogin && (
              <div>
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
              </div>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is your Email?</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                onChange={handleEmailInput}
                value={email}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                What is your Password?
              </legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                onChange={handlePasswordInput}
                value={password}
              />
            </fieldset>
          </div>
          <p className="text-red-500 font-bold">{error}</p>
          <div className="justify-center card-actions pt-2">
            {isLogin && (
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            )}
            {!isLogin && (
              <button className="btn btn-primary" onClick={handleSignIn}>
                SignUp
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
