import React from "react";
import MessageInput from "./MessageInput";

export default function ChatRoom({ messages, onSend }) {
  return (
    <div className="chat-room">
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <strong>{msg.senderName}: </strong> {msg.text}
          </div>
        ))}
      </div>
      <MessageInput onSend={onSend} />
    </div>
  );
}
