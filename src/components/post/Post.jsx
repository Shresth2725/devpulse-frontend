import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utilis/constant";
import PostCard from "./PostCard";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${baseUrl}/post/fetch`, {
        withCredentials: true,
      });
      setPosts(res.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(`${baseUrl}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.url;
    } catch (err) {
      console.error("Image upload failed:", err);
      setUploadError("Failed to upload image. Please try again.");
      return null;
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (uploadError) return;

    try {
      const imageUrl = await handleImageUpload();
      if (!imageUrl) return;

      await axios.post(
        `${baseUrl}/post/create`,
        { message, imageUrl },
        { withCredentials: true }
      );

      setMessage("");
      setImageFile(null);
      setUploadError("");
      document.getElementById("create_post_modal").close();
      fetchPost();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("create_post_modal").showModal()
          }
        >
          Create Post
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post._id} data={post} fetchPost={fetchPost} />
        ))}
      </div>

      <dialog id="create_post_modal" className="modal">
        <div className="modal-box w-96">
          <h3 className="font-bold text-lg">Create New Post</h3>
          <form onSubmit={handlePostSubmit} className="space-y-4 mt-4">
            <textarea
              placeholder="Write your message..."
              className="textarea textarea-bordered w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (file.size > 5 * 1024 * 1024) {
                    setUploadError("Image must be under 5MB.");
                    setImageFile(null);
                  } else {
                    setUploadError("");
                    setImageFile(file);
                  }
                }
              }}
              required
            />
            {uploadError && (
              <div className="text-red-500 text-sm">{uploadError}</div>
            )}
            <div className="modal-action">
              <button type="submit" className="btn btn-success">
                Post
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("create_post_modal").close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Post;
