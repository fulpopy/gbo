// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import { OrderProvider, KarigarProvider } from "./context";

function App() {
  return (
    <OrderProvider>
      <KarigarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <Navigate to="/orders" />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </KarigarProvider>
    </OrderProvider>
  );
}

export default App;
