import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    if (!destination || !checkInDate || !checkOutDate) {
      alert("Please fill in all fields");
      return;
    }
    navigate("/results", {
      state: { destination, checkInDate, checkOutDate, rooms, guests }
    });
  };

  return (
    <div className="glass-card fade-in" style={{
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(30px)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderRadius: "24px",
      padding: "40px",
      maxWidth: "1000px",
      margin: "0 auto"
    }}>
      <h3 style={{
        marginBottom: "30px",
        color: "#e0e7ff",
        fontSize: "20px",
        fontWeight: "700",
        textAlign: "center"
      }}>
        🔍 Find Your Perfect Hotel
      </h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "20px",
        alignItems: "flex-end"
      }}>
        {/* Destination */}
        <div>
          <label style={{
            display: "block",
            marginBottom: "8px",
            color: "#cbd5e1",
            fontSize: "13px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            📍 Destination
          </label>
          <input
            placeholder="Which city?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              background: "rgba(255, 255, 255, 0.08)",
              color: "white",
              fontSize: "14px",
              transition: "all 0.3s ease",
              fontFamily: "'Poppins', sans-serif"
            }}
            onFocus={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.15)";
              e.target.style.borderColor = "rgba(139, 92, 246, 0.6)";
            }}
            onBlur={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.08)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.15)";
            }}
          />
        </div>

        {/* Check-in Date */}
        <div>
          <label style={{
            display: "block",
            marginBottom: "8px",
            color: "#cbd5e1",
            fontSize: "13px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            📅 Check-in
          </label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              background: "rgba(255, 255, 255, 0.08)",
              color: "white",
              fontSize: "14px",
              transition: "all 0.3s ease",
              fontFamily: "'Poppins', sans-serif"
            }}
            onFocus={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.15)";
              e.target.style.borderColor = "rgba(139, 92, 246, 0.6)";
            }}
            onBlur={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.08)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.15)";
            }}
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label style={{
            display: "block",
            marginBottom: "8px",
            color: "#cbd5e1",
            fontSize: "13px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            📅 Check-out
          </label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              background: "rgba(255, 255, 255, 0.08)",
              color: "white",
              fontSize: "14px",
              transition: "all 0.3s ease",
              fontFamily: "'Poppins', sans-serif"
            }}
            onFocus={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.15)";
              e.target.style.borderColor = "rgba(139, 92, 246, 0.6)";
            }}
            onBlur={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.08)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.15)";
            }}
          />
        </div>

        {/* Rooms */}
        <div>
          <label style={{
            display: "block",
            marginBottom: "8px",
            color: "#cbd5e1",
            fontSize: "13px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            🛏️ Rooms
          </label>
          <select
            value={rooms}
            onChange={(e) => setRooms(parseInt(e.target.value))}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              background: "rgba(255, 255, 255, 0.08)",
              color: "white",
              fontSize: "14px",
              transition: "all 0.3s ease",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? "Room" : "Rooms"}</option>
            ))}
          </select>
        </div>

        {/* Guests */}
        <div>
          <label style={{
            display: "block",
            marginBottom: "8px",
            color: "#cbd5e1",
            fontSize: "13px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            👥 Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              background: "rgba(255, 255, 255, 0.08)",
              color: "white",
              fontSize: "14px",
              transition: "all 0.3s ease",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            {[1, 2, 3, 4, 5, 10, 20, 50, 100].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="btn-primary"
          style={{
            width: "100%",
            padding: "14px 28px",
            fontSize: "15px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px",
            cursor: "pointer",
            transition: "all 0.4s ease"
          }}
        >
          🔍 Search Hotels
        </button>
      </div>

      <p style={{
        marginTop: "20px",
        textAlign: "center",
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: "12px"
      }}>
        💡 Real-time prices from 100+ hotels across India
      </p>
    </div>
  );
};

export default SearchForm;