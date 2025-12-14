import React, { createContext, useContext } from "react";
import { useSubscription } from "../hooks/useSubscription";
import { useAuth } from "./AuthContext"; // your existing auth

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const { user } = useAuth();
  const { subStatus, subLoading } = useSubscription(user?.uid);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription: subStatus,
        subLoading,
        isPremium: subStatus === "premium",
        isFree: subStatus === "free",
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptionContext = () => useContext(SubscriptionContext);
