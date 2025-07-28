import React, { useState } from "react";
import ConnectionChat from "./ConnectionChat";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

const ChatLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-base-100 text-base-content relative overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-base-100 border-r border-base-300 z-40
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          sm:relative sm:translate-x-0 sm:w-1/3 lg:w-1/4 sm:z-10
          flex flex-col
        `}
      >
        {/* Close button (mobile only) */}
        <div className="sm:hidden flex justify-end p-2 shrink-0">
          <button onClick={() => setIsSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable ConnectionChat */}
        <div className="flex-1 overflow-y-auto">
          <ConnectionChat closeSidebar={() => setIsSidebarOpen(false)} />
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col z-0 relative">
        {/* Mobile Header */}
        <div className="sm:hidden flex items-center justify-between p-4 border-b border-base-300 bg-base-200">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu />
          </button>
          <h2 className="text-lg font-semibold">Chat</h2>
        </div>

        {/* Chat Outlet */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
