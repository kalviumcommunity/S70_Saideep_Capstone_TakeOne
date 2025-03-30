import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authcontext"; 
import PrivateRoute from "./components/PrivateRoutes";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Discover from "./pages/Discover";
import Communities from "./pages/Communities";
import Workshops from "./pages/Workshops";

const App = () => {
  return (
    <AuthProvider> {/* Wrap everything inside AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/workshops" element={<Workshops />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
