import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "../../utilis/constant";
import { addUser } from "../../utilis/userSlice";
import FeedCard from "../feed/FeedCard";
// import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const user = useSelector((store) => store.User?.data || store.User);
  console.log(user);

  var isPremium = user?.isPremium;
  console.log(isPremium);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [id, setId] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (user && !isInitialized) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setAbout(user.about || "");
      setSkills(user.skills || []);
      setGender(user.gender || "");
      setPhotoUrl(user.photoUrl || "");
      setId(user._id || "");
      setIsInitialized(true);
    }
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      if (!firstName.trim() || !lastName.trim()) {
        throw new Error("First name and last name are required!");
      }

      const updatedUser = {
        firstName,
        lastName,
        age,
        about,
        skills,
        gender,
        photoUrl,
      };

      await axios.patch(baseUrl + "/profile/edit", updatedUser, {
        withCredentials: true,
      });

      dispatch(addUser({ data: updatedUser }));
      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      setMessage("❌ Failed to update profile: " + err.message);
      // navigate("/error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10 p-6 min-h-screen bg-base-100">
      {/* Edit Profile Form */}
      <div className="w-full lg:flex-1 bg-base-200 rounded-2xl shadow-lg p-6 h-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Edit Profile
        </h2>

        {message && (
          <p
            className={`text-sm text-center font-medium mb-4 ${
              message.startsWith("✅") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Age</label>
            <input
              type="number"
              min="0"
              className="input input-bordered w-full"
              value={age}
              onChange={(e) => {
                const val = e.target.value;
                setAge(val === "" ? "" : parseInt(val));
              }}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Skills</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={skills.join(", ")}
              onChange={(e) =>
                setSkills(e.target.value.split(",").map((s) => s.trim()))
              }
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block font-semibold mb-1">About</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block font-semibold mb-1">Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          <div className="lg:col-span-2 flex gap-6 items-center mt-2">
            <label className="font-semibold">Gender:</label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                className="radio radio-success"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                className="radio radio-success"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>

          <div className="lg:col-span-2 mt-4">
            <button
              className="btn btn-success w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </div>

      {/* FeedCard Preview */}
      <div className="w-full lg:flex-1 bg-base-200 rounded-2xl shadow-lg p-6 h-full">
        <FeedCard
          user={{
            firstName,
            lastName,
            age,
            gender,
            photoUrl,
            about,
            skills,
            isPremium,
            _id: id,
          }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
