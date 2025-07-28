import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utilis/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../utilis/constant";

const Chat = () => {
  const { targetUserId, targetFirstName } = useParams();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((Store) => Store.User);
  const userId = user?.data?._id;
  const firstName = user?.data?.firstName;
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    // Clear previous messages
    setMessage([]);

    // Create and store socket connection
    socketRef.current = createSocketConnection();

    // Join the chat room
    socketRef.current.emit("joinChat", { targetUserId, userId, firstName });

    // Listen for new incoming messages
    socketRef.current.on(
      "messageReceived",
      ({ text, firstName, createdAt }) => {
        setMessage((prev) => [
          ...prev,
          {
            text,
            firstName,
            createdAt: createdAt || new Date().toISOString(),
          },
        ]);
      }
    );

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current?.emit("sendMessage", {
      userId,
      targetUserId,
      text: newMessage,
      firstName,
    });

    setNewMessage("");
  };

  const fetchChat = async () => {
    try {
      const res = await axios.get(`${baseUrl}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = res.data.data.messages || [];

      const formattedMessages = chatMessages.map((msg) => ({
        text: msg.text,
        firstName: msg.senderId.firstName,
        createdAt: msg.createdAt,
      }));

      setMessage(formattedMessages);
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-base-100">
      {/* Header */}
      <div className="p-4 bg-base-200 shadow-md">
        <h1 className="text-xl font-bold">{targetFirstName}</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {message.map((msg, index) => {
          const isSelf = msg.firstName === firstName;
          return (
            <div
              key={index}
              className={`chat ${isSelf ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header text-sm font-semibold mb-1 flex items-center justify-between">
                <span>{msg.firstName}</span>
                {msg.createdAt && (
                  <span className="text-xs opacity-70 ml-2">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
              <div
                className={`chat-bubble ${
                  isSelf
                    ? "chat-bubble-primary text-white"
                    : "chat-bubble-neutral text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-base-200 flex items-center gap-2 mb-15 z-20">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
