import React, { useState, useEffect, createContext, useContext } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (severity, message) => {
    setAlert({ severity, message });

    setTimeout(() => {
      setAlert(null);
    }, 3000); // Auto-hide alert after 3 seconds
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {alert && (
        <Stack sx={{ width: "100%", position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 1000 }} spacing={2}>
          <Alert variant="filled" severity={alert.severity}>
            {alert.message}
          </Alert>
        </Stack>
      )}
      {children}
    </AlertContext.Provider>
  );
};
