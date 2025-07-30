import axios from "axios";
import { baseUrl } from "../../utilis/constant";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Premium = () => {
  var isPremium = useSelector((store) => store.User.isPremium);
  const [isUserPremium, setIsUserPremium] = useState(isPremium);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const handleBuyClick = async (plan) => {
    const order = await axios.post(
      baseUrl + "/payment/create",
      { plan },
      { withCredentials: true }
    );

    const { amount, currency, orderId, notes } = order.data.data;
    const { firstName, lastName } = notes;

    const options = {
      key: order.data.keyId,
      amount,
      currency,
      name: "DevPulse",
      description: "Membership Purchase",
      order_id: orderId,
      prefill: {
        name: `${firstName} ${lastName}`,
        email: "x@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#2563eb",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const verifyPremiumUser = async () => {
    const res = await axios.get(baseUrl + "/payment/status", {
      withCredentials: true,
    });
    if (res.data.isPremium) setIsUserPremium(true);
  };

  if (isUserPremium) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-4xl font-bold text-success">
              You are already a Premium user!
            </h1>
            <p className="mt-2 text-lg">Enjoy all the exclusive features 🎉</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-10">
      <h1 className="text-4xl font-bold text-center mb-12">
        Premium Membership
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 px-4">
        {/* Silver Membership */}
        <div className="card w-96 bg-base-200 shadow-xl border hover:scale-105 transition">
          <div className="card-body text-center">
            <h2 className="card-title text-slate-600 justify-center">
              Silver Membership
            </h2>
            <p className="text-sm text-slate-500 mb-2">Valid for 3 Months</p>
            <ul className="text-left list-disc list-inside text-base-content">
              <li>Chat with other people</li>
              <li>100 connection requests/day</li>
              <li>Blue Tick Badge</li>
            </ul>
            <div className="mt-6 w-full">
              <button
                onClick={() => handleBuyClick("silver")}
                className="btn btn-primary w-full"
              >
                Buy Silver – ₹299
              </button>
            </div>
          </div>
        </div>

        {/* Gold Membership */}
        <div className="card w-96 bg-base-200 shadow-xl border-yellow-400 hover:scale-105 transition">
          <div className="card-body text-center">
            <h2 className="card-title text-yellow-600 justify-center">
              Gold Membership
            </h2>
            <p className="text-sm text-yellow-500 mb-2">Valid for 6 Months</p>
            <ul className="text-left list-disc list-inside text-base-content">
              <li>Chat with other people</li>
              <li>200 connection requests/day</li>
              <li>Gold Tick Badge</li>
            </ul>
            <div className="mt-6 w-full">
              <button
                onClick={() => handleBuyClick("gold")}
                className="btn btn-warning w-full"
              >
                Buy Gold – ₹499
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
