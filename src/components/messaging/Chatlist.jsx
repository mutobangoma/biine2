import React from "react";

export default function ChatList({ chats, onSelect }) {
  return (
    <ul className="chat-list">
      {chats.map((chat) => (
        <li key={chat.id} onClick={() => onSelect(chat)}>
          {chat.name}
        </li>
      ))}
    </ul>
  );
}
