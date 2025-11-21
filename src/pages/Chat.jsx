// src/pages/Chat.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Chat() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, is this still available?", me: false, time: "10:02" },
    { id: 2, text: "Yes, it's available.", me: true, time: "10:05" },
  ]);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), text, me: true, time: "Now" }]);
    setText("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-2xl p-4 shadow-biine h-[70vh] flex flex-col">
        <div className="flex-1 overflow-auto space-y-3 p-2">
          {messages.map((m) => (
            <div key={m.id} className={`${m.me ? "text-right" : "text-left"}`}>
              <div className={`inline-block px-4 py-2 rounded-lg ${m.me ? "bg-primary text-white" : "bg-gray-100 text-gray-800"}`}>
                {m.text}
              </div>
              <div className="text-xs text-gray-400 mt-1">{m.time}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <input className="input flex-1" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message..." />
          <button onClick={send} className="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  );
}
