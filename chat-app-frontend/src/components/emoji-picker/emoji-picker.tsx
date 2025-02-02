/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import EmojiPicker only on the client
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export default function ListEmojis({ showPicker, setShowPicker }: any) {
  const [message, setMessage] = useState<string>("");

  const handleEmojiClick = (emojiObject: any) => {
    setMessage((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleToggleEmojiPicker = () => {
    setShowPicker(!showPicker);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage(""); // Clear input after sending
  };

  return (
    <div className="chat-container w-full h-full">
      <div className="messages">{/* Your messages rendering logic */}</div>

      <div className="input-area">
        {showPicker && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <div className="input-controls">
          <button onClick={handleToggleEmojiPicker} className="emoji-button">
            😀 {/* Emoji picker toggle button */}
          </button>

          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            className="message-input"
          />

          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
