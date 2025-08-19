import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contextProvider/AuthProvider";
import { ThemeProvider } from "./contextProvider/ThemeProvider";
import { ProfileContextProvider } from "./contextProvider/ProfileContextProvider";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProfileContextProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          transitionOnChange
        >
        
            <App />
        </ThemeProvider>
      </AuthProvider>
      </ProfileContextProvider>
    </BrowserRouter>
  </StrictMode>
);
