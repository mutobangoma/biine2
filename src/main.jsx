import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.css";
import "./styles/theme.css";

import { AuthProvider } from "./context/AuthContext";
import { MessagingProvider } from "./context/MessagingContext";
import { StoreProvider } from "./context/StoreContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import { AdminProvider } from "./context/AdminContext";
import { ChatProvider } from "./context/ChatContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import { AdsProvider } from "./context/AdsContext";
import { BoostProvider } from "./context/BoostContext";
import { LocationProvider } from "./context/LocationContext";
import { PaymentsProvider } from "./context/PaymentsContext";
import { HelmetProvider } from "react-helmet-async";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <HelmetProvider>
          <SubscriptionProvider>
            <NotificationsProvider>
              <AdsProvider>
                <BoostProvider>
                  <LocationProvider>
                    <MessagingProvider>
                      <ChatProvider>
                        <PaymentsProvider>
                          <AdminProvider>
                            <AuthProvider>
                              <App />
                            </AuthProvider>
                          </AdminProvider>
                        </PaymentsProvider>
                      </ChatProvider>
                    </MessagingProvider>
                  </LocationProvider>
                </BoostProvider>
              </AdsProvider>
            </NotificationsProvider>
          </SubscriptionProvider>
        </HelmetProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
