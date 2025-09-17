import "./styles/App.css";
import Login from "./pages/Auth/Login";
import Signin from "./pages/Auth/Signin";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Layout/Footer";
import NavBar from "./components/Layout/NavBar";
import Ranking from "./pages/Ranking";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import Game from "./components/Game/Game";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>
                  <NavBar />
                  <Dashboard />
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ranking"
            element={
              <ProtectedRoute>
                <div>
                  <NavBar />
                  <Ranking />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="game"
            element={
              <ProtectedRoute>
                <div>
                  <NavBar />
                  <Game />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
