/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SetStateAction, useState } from "react";
import { io } from "socket.io-client";
import { contacts, getMedianFromTime } from "./contacts";
import ChatHome from "./chat-home";
import ChangeLoggedInUser from "./admin-change-user";
import ListEmojis from "../emoji-picker/emoji-picker";

const socket = io("http://localhost:4000");

export default function DashboardPage() {
  const [isClickedProfile, setIsClickedProfile] = useState<boolean>(false);
  const [loggedInContact, setLoggedInContact] = useState(contacts[0]);

  const [activeContact, setActiveContact] = useState(contacts[1]);
  const [textMessage, setTextMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(textMessage.length > 0);

  const [showPicker, setShowPicker] = useState<boolean>(false);

  socket.emit("register", loggedInContact.avatar);

  console.log(socket.active);

  const handleTextMessageChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    const value = e.target.value;
    setTextMessage(value);
    setIsTyping(value.length > 0);
  };

  return (
    <div className="bg-primary-medium-dark h-full">
      <div className="flex flex-col md:flex-row h-screen w-full">
        {/* Sidebar */}
        <div className="flex h-full w-full md:w-[35%] bg-primary-dark border-r border-gray-600">
          <nav className="h-full w-[15%] bg-primary-charcoal hidden md:block">
            <div className="p-8 flex flex-col h-full bg-primary-charcoal items-center justify-between">
              <header className="flex flex-col space-y-6">
                <a className="mt-2">
                  <span className="material-symbols-rounded">
                    mark_unread_chat_alt
                  </span>
                </a>
                <span className="material-symbols-rounded">
                  arrow_upload_progress
                </span>
                <span className="material-symbols-rounded">
                  tv_options_edit_channels
                </span>
                <span className="material-symbols-rounded">groups</span>
              </header>

              <footer className="flex flex-col space-y-5 w-full">
                <a className="mb-2">
                  <span className="material-symbols-rounded">settings</span>
                </a>
                <a
                  className="h-full w-full hover:cursor-pointer"
                  onClick={() => setIsClickedProfile(!isClickedProfile)}
                >
                  <img
                    className="h-full w-full rounded-full"
                    src={loggedInContact.avatar}
                    alt="loggedIn avatar"
                  />
                </a>
              </footer>
            </div>
          </nav>
          {isClickedProfile ? (
            <ChangeLoggedInUser
              setLoggedInContact={setLoggedInContact}
              loggedInContact={loggedInContact}
            />
          ) : (
            <ChatHome
              activeContact={activeContact}
              setActiveContact={setActiveContact}
              loggedInContact={loggedInContact}
            />
          )}
        </div>

        {/* Chat section */}
        <div className="flex flex-col h-full w-full md:w-[65%] bg-primary-dark">
          <header className="h-20 w-full py-3 px-5 bg-primary-charcoal">
            <div className="h-full flex justify-between">
              <div className="flex items-center space-x-8 h-full">
                <img
                  className="h-full rounded-full"
                  src={activeContact.avatar}
                  alt="selected avatar"
                />
                <h2 className="font-extrabold text-2xl">
                  {activeContact.name}
                </h2>
              </div>
              <div className="flex mt-3 space-x-8">
                <span className="material-symbols-rounded">search</span>
                <span className="material-symbols-rounded">more_vert</span>
              </div>
            </div>
          </header>

          <div
            className="flex-1 relative bg-primary-dark"
            style={{
              backgroundImage: "url('./web-whatsapp-default-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Conversations Area */}
            <div className="absolute inset-0 overflow-auto p-4 space-y-2">
              {activeContact.conversations.map((conversation, index) => {
                const { period, time } = getMedianFromTime(conversation.time);
                const isUserMessage =
                  Math.floor(Math.random() * 10 + 1) % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`flex ${
                      isUserMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        isUserMessage
                          ? "bg-dark-green text-white rounded-br-none extrude-right"
                          : "bg-primary-dark text-white rounded-bl-none extrude-left"
                      }`}
                    >
                      <p className="text-lg">{conversation.message}</p>
                      <span className="mt-2 block text-xs text-right">
                        {`${time} ${period}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat input */}
          <footer className="flex w-full bg-primary p-3">
            {showPicker && (
              <div className="w-full">
                <ListEmojis
                  showPicker={showPicker}
                  setShowPicker={setShowPicker}
                />
              </div>
            )}
            <div className="flex w-[10%] h-full justify-evenly mt-3">
              <span
                className="material-symbols-rounded cursor-pointer"
                onClick={() => setShowPicker(true)}
              >
                mood
              </span>
              <span className="material-symbols-rounded">add</span>
            </div>
            <div className="flex h-full w-full space-x-6 justify-between">
              <input
                value={textMessage}
                onChange={handleTextMessageChange}
                placeholder="Type a message"
                className="bg-primary-steel h-12 w-[95%] px-4 rounded-md focus:outline-none"
              />
              {!isTyping ? (
                <span className="mt-3 w-[5%] material-symbols-rounded">
                  mic
                </span>
              ) : (
                <span className="mt-3 w-[5%] material-symbols-rounded">
                  send
                </span>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
