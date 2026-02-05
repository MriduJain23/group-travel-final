const AIInsights = () => {
  return (
    <div className="container fade-in" style={{ marginTop: "60px" }}>
      <h1>🤖 AI Social Intelligence</h1>

      <div className="glass-card" style={{ marginTop: "24px" }}>
        <h3>Guest Engagement Prediction</h3>
        <p>✔ High interaction expected among business delegates</p>
      </div>

      <div className="glass-card" style={{ marginTop: "24px" }}>
        <h3>Recommended Activities</h3>
        <ul>
          <li>Networking Dinner</li>
          <li>Team-building Icebreakers</li>
          <li>Relaxation Sessions</li>
        </ul>
      </div>

      <div className="glass-card" style={{ marginTop: "24px" }}>
        <h3>Emotional Insights</h3>
        <p>Overall guest sentiment: 😊 Positive</p>
      </div>
    </div>
  );
};

export default AIInsights;
