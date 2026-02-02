import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Results from "./pages/Results";
import HotelDetails from "./pages/HotelDetails";
import GroupDashboard from "./pages/GroupDashboard";
import Reports from "./pages/Reports";
import SecureLanding from "./pages/SecureLanding";

function App() {
  return (
    <Navbar />
    {/* Push content below sticky navbar */}
    <div style={{ marginTop: "80px" }}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/results" element={<Results />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="/group-dashboard" element={<GroupDashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/secure" element={<SecureLanding />} />
    </Routes>
    </div>
  );
}




export default App;
