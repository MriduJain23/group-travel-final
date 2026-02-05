import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 9999,
        background: "rgba(2, 6, 23, 0.75)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "12px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <h2
          onClick={() => navigate("/")}
          style={{
            fontWeight: 700,
            cursor: "pointer",
            background: "linear-gradient(90deg, #38bdf8, #2563eb)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          GroupTravel
        </h2>

        {/* Navigation */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* Existing buttons kept */}
          <NavBtn label="View Reports" onClick={() => navigate("/reports")} />
          <NavBtn label="Secure Access" onClick={() => navigate("/secure")} />

          {/* Newly added features */}
          <NavBtn label="Event" onClick={() => navigate("/event/1")} />
          <NavBtn label="Guests" onClick={() => navigate("/guests")} />
          <NavBtn label="Resource Allocation" onClick={() => navigate("/resource-allocation")} />
          <NavBtn label="AI Insights" onClick={() => navigate("/ai-insights")} />

          {/* Primary CTA */}
          <button
            className="btn-primary"
            onClick={() => navigate("/results")}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              background: "linear-gradient(90deg,#38bdf8,#2563eb)",
              color: "white",
              fontWeight: 600,
            }}
          >
            Create Group
          </button>
        </div>
      </div>
    </nav>
  );
};

/* Reusable Nav Button */
const NavBtn = ({ label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      color: "white",
      border: "1px solid rgba(255,255,255,0.3)",
      padding: "8px 12px",
      borderRadius: "8px",
      background: "transparent",
      cursor: "pointer",
      fontSize: "14px",
    }}
  >
    {label}
  </button>
);

export default Navbar;
