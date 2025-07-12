import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("Shresth@gmail.com");
  const [password, setPassword] = useState("Shresth@1234");

  const handleEmailInput = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePasswordInput = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleLogin = async () => {
    // console.log("Email:", email);
    // console.log("Password:", password);
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(res);
    } catch (err) {
      console.log(err.message);
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
          <div className="justify-center card-actions pt-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
