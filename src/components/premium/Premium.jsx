import axios from "axios";
import { baseUrl } from "../../utilis/constant";
import React from "react";

const Premium = () => {
  const handleBuyClick = async (plan) => {
    const order = await axios.post(
      baseUrl + "/payment/create",
      { plan },
      { withCredentials: true }
    );

    const { amount, currency, orderId, notes } = order.data.data;
    const { firstName, lastName } = notes;

    // Open the dialogue box
    const options = {
      key: order.data.keyId,
      amount: amount,
      currency: currency,
      name: "DevPulse",
      description: "Test Transaction",
      order_id: orderId,
      prefill: {
        name: `${firstName} ${lastName}`,
        email: "x@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="m-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Premium Membership
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        {/* Silver Membership */}
        <div className="card w-96 bg-base-200 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-slate-600">Silver Membership</h2>
            <ul className="text-left list-disc list-inside">
              <li>Chat with other people</li>
              <li>100 connection requests per day</li>
              <li>Blue Tick</li>
              <li>3 months validity</li>
            </ul>
            <div className="card-actions mt-4">
              <button
                onClick={() => handleBuyClick("silver")}
                className="btn btn-primary"
              >
                Buy Silver
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider lg:divider-horizontal text-xl">OR</div>

        {/* Gold Membership */}
        <div className="card w-96 bg-base-200 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-yellow-600">Gold Membership</h2>
            <ul className="text-left list-disc list-inside">
              <li>Chat with other people</li>
              <li>200 connection requests per day</li>
              <li>Gold Tick</li>
              <li>6 months validity</li>
            </ul>
            <div className="card-actions mt-4">
              <button
                onClick={() => handleBuyClick("gold")}
                className="btn btn-warning"
              >
                Buy Gold
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
