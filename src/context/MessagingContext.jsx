import React, { createContext, useContext, useState } from "react";
import { useMessaging } from "../hooks/useMessaging";

const MessagingContext = createContext();

export const MessagingProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState(null);

  // useMessaging handles fetching + sending messages
  const { messages, sendMessage } = useMessaging(conversationId);

  return (
    <MessagingContext.Provider
      value={{
        conversationId,
        setConversation: setConversationId,
        messages,
        sendMessage,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessagingContext = () => useContext(MessagingContext);
