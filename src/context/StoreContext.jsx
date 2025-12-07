import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  return (
    <StoreContext.Provider
      value={{
        loading,
        modal,
        toast,
        setLoading,
        openModal: (m) => setModal(m),
        closeModal: () => setModal(null),
        showToast: (msg) => {
          setToast(msg);
          setTimeout(() => setToast(null), 2500);
        },
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
