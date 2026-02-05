const EventMicrosite = () => {
  return (
    <div className="container fade-in" style={{ marginTop: "60px" }}>
      <h1>💍 Sharma–Verma Wedding</h1>
      <p style={{ opacity: 0.8 }}>
        📍 Gangtok • 📅 20–22 December 2024
      </p>

      {/* Itinerary */}
      <div className="glass-card" style={{ marginTop: "24px" }}>
        <h3>📅 Event Itinerary</h3>
        <ul style={{ marginTop: "10px", lineHeight: "1.8" }}>
          <li>Day 1 – Arrival & Welcome Dinner</li>
          <li>Day 2 – Wedding Ceremony</li>
          <li>Day 3 – Breakfast & Checkout</li>
        </ul>
      </div>

      {/* Hotel */}
      <div className="glass-card" style={{ marginTop: "24px" }}>
        <h3>🏨 Hotel Assignment</h3>
        <p>Grand Himalayan Resort</p>
        <p>Room Type: Deluxe Double</p>
      </div>

      {/* Live Updates */}
      <div className="glass-card" style={{ marginTop: "24px" }}>
        <h3>⚡ Real-Time Updates</h3>
        <p>✔ Dinner time updated to 8:30 PM</p>
      </div>

      {/* AI Suggestions */}
      <div className="glass-card" style={{ marginTop: "24px" }}>
        <h3>🤖 AI Recommendations</h3>
        <ul>
          <li>✔ Assign nearby rooms for families</li>
          <li>✔ Suggest spa slots for relaxation-seeking guests</li>
          <li>✔ Schedule networking dinner for business guests</li>
        </ul>
      </div>
    </div>
  );
};

export default EventMicrosite;
