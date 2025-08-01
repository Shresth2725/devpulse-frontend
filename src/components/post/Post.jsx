import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utilis/constant";
import PostCard from "./PostCard";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

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

  const handleImgageUpload = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(baseUrl + "/upload", formData);
      // console.log(res.data.url);

      setImgUrl(res.data.url);
      return res.data.url;
    } catch (err) {
      console.error("Upload failed:", err);
      return null;
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedUrl = await handleImgageUpload();

      await axios.post(
        `${baseUrl}/post/create`,
        { message, imageUrl: uploadedUrl },
        {
          withCredentials: true,
        }
      );

      setMessage("");
      setImageFile(null);
      document.getElementById("create_post_modal").close();
      fetchPost();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setImageFile(null);
      setImgUrl("");
      setMessage("");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (posts.length === 0) {
    return <div className="text-xl text-center">Loading...</div>;
  }

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
              accept=".jpg, .jpeg, .png"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            />
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
