import React from "react";
import ReactDOM from "react-dom/client";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import "./reset.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store, persistor } from "./api/reduxStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Box as="main" h="100vh">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </Box>
    </ChakraProvider>
  </React.StrictMode>
);
