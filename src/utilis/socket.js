import { io } from "socket.io-client";
import { baseUrl } from "./constant";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") return io(baseUrl);
  else return io("/", { path: "/api/socket.io" });
};
