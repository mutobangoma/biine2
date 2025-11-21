// src/pages/Inbox.jsx
import React from "react";
import { Link } from "react-router-dom";

const MOCK_CHATS = [
  { id: "1", name: "John Doe", snippet: "Is this still available?", unread: 2, time: "1h" },
  { id: "2", name: "Lusaka Motors", snippet: "We can do ZMW 40k", unread: 0, time: "3d" },
];

export default function Inbox() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl p-4 shadow-biine">
        <h3 className="text-lg font-semibold mb-4">Messages</h3>
        <div className="divide-y">
          {MOCK_CHATS.map((c) => (
            <Link key={c.id} to={`/chat/${c.id}`} className="flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded-md">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-gray-500">{c.snippet}</div>
              </div>
              <div className="text-sm text-gray-400">{c.time}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
