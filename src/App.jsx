import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Results from "./pages/Results";
import HotelDetails from "./pages/HotelDetails";
import GroupDashboard from "./pages/GroupDashboard";
import Reports from "./pages/Reports";
import SecureLanding from "./pages/SecureLanding";
import EventMicrosite from "./pages/Event/EventMicrosite";
import AIInsights from "./pages/AIInsights/AIInsights.jsx";
import Guests from "./pages/Guests/Guests.jsx";
import ResourceAllocation from "./pages/ResourceAllocation/ResourceAllocation.jsx";




function App() {
  return (
    <>
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
          <Route path="/event/:id" element={<EventMicrosite />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/resource-allocation" element={<ResourceAllocation />} />
          <Route path="/ai-insights" element={<AIInsights />} />


        </Routes>
      </div>
    </>
  );
}

export default App;
