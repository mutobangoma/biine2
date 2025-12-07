import React, { createContext, useContext, useState } from "react";
import { useMessaging } from "../hooks/useMessaging";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [activeChatId, setActiveChatId] = useState(null);

  const { messages, sendMessage } = useMessaging(activeChatId);

  return (
    <ChatContext.Provider
      value={{
        activeChatId,
        setActiveChatId,
        messages,
        sendMessage,
        hasActiveChat: !!activeChatId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
