import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/hotels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        CityId: "110089",
        CheckInDate: "2024-12-20",
        CheckOutDate: "2024-12-22",
        Rooms: 1
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("LIVE TBO RESPONSE:", data); // 🔥 proof
        setHotels(data?.HotelSearchResult?.HotelResults || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 👇 Demo fallback hotels (same shape as live)
  const demoHotels = [
    {
      HotelName: "Grand Himalayan Resort",
      StarRating: 4.6,
      Price: { TotalPrice: 4500 },
      Location: "Gangtok"
    },
    {
      HotelName: "Mountain View Palace",
      StarRating: 4.8,
      Price: { TotalPrice: 6200 },
      Location: "Gangtok"
    }
  ];

  return (
    <div className="container">
      <h1>Live Hotel Results (TBO API)</h1>

      {loading && <p>Fetching real-time availability…</p>}

      {/* 🔥 LIVE RESULTS */}
      {hotels.map((h, i) => (
        <div key={i} className="glass-card" style={{ marginTop: "16px" }}>
          <h3>{h.HotelName}</h3>
          <p>⭐ {h.StarRating}</p>
          <p>₹ {h.Price?.TotalPrice}</p>

          <button
            className="btn-primary"
            style={{ marginTop: "10px" }}
            onClick={() => navigate("/group-dashboard", { state: h })}
          >
            Add to Group Plan
          </button>
        </div>
      ))}

      {/* 🧠 FALLBACK (STAGING LIMITATION HANDLED) */}
      {!loading && hotels.length === 0 && (
        <>
          <p style={{ opacity: 0.75, marginTop: "20px" }}>
            Live API returned no data (staging limitation). Showing demo results.
          </p>

          {demoHotels.map((h, i) => (
            <div key={i} className="glass-card" style={{ marginTop: "16px" }}>
              <h3>{h.HotelName}</h3>
              <p>⭐ {h.StarRating}</p>
              <p>₹ {h.Price.TotalPrice}</p>

              <button
                className="btn-primary"
                style={{ marginTop: "10px" }}
                onClick={() => navigate("/group-dashboard", { state: h })}
              >
                Add to Group Plan
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
