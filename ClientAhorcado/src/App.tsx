import "./styles/App.css";
import Login from "./pages/Auth/Login";
import Signin from "./pages/Auth/Signin";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Layout/Footer";
import NavBar from "./components/Layout/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/dashboard"
            element={
              <div>
                <NavBar />
                <Dashboard />
                <Footer />
              </div>
            }
          />
          <Route path="/ranking" />
          <Route path="game" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
