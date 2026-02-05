import { useState, useEffect } from 'react';
import AISocialIntelligenceService from '../../services/AISocialIntelligenceService';
import './AIInsights.css';

const AIInsights = ({ eventData = {}, guests = [] }) => {
  const [activeTab, setActiveTab] = useState('engagement');
  const [predictions, setPredictions] = useState({
    interactions: [],
    networking: [],
    pairings: [],
    emotionalStates: [],
    sentimentTrends: {},
    realTimeAnalysis: {},
  });
  const [loading, setLoading] = useState(false);

  // Load AI predictions on mount and when data changes
  useEffect(() => {
    loadAIPredictions();
  }, [guests, eventData]);

  const loadAIPredictions = async () => {
    setLoading(true);
    try {
      // Social Engagement Predictions
      const interactions = AISocialIntelligenceService.predictGuestInteractions(guests);
      
      // Networking Opportunities
      const networking = AISocialIntelligenceService.suggestNetworkingOpportunities(guests);
      
      // Guest Pairings
      const pairings = AISocialIntelligenceService.suggestGuestPairings(guests);
      
      // Emotional State Predictions
      const emotionalStates = AISocialIntelligenceService.predictGuestEmotionalStates(guests);
      
      // Sentiment Trends
      const sentimentTrends = AISocialIntelligenceService.getSentimentTrends();
      
      // Real-time Engagement Analysis
      const realTimeAnalysis = AISocialIntelligenceService.analyzeRealTimeEngagement(eventData);

      setPredictions({
        interactions,
        networking,
        pairings,
        emotionalStates,
        sentimentTrends,
        realTimeAnalysis,
      });
    } catch (error) {
      console.error('Error loading AI predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ai-insights-container loading">
        <div className="ai-loader">
          <div className="loader-spinner"></div>
          <p>🤖 AI is analyzing guest interactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-insights-container">
      <div className="ai-header">
        <div className="ai-title-section">
          <h1>🤖 AI-Powered Social Intelligence</h1>
          <p>Smart insights into guest interactions, networking opportunities, and emotional well-being</p>
        </div>
        <button className="btn-refresh-insights" onClick={loadAIPredictions}>
          🔄 Refresh Analysis
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="ai-tabs">
        <button
          className={`tab-btn ${activeTab === 'engagement' ? 'active' : ''}`}
          onClick={() => setActiveTab('engagement')}
        >
          👥 Social Engagement
        </button>
        <button
          className={`tab-btn ${activeTab === 'networking' ? 'active' : ''}`}
          onClick={() => setActiveTab('networking')}
        >
          🤝 Networking
        </button>
        <button
          className={`tab-btn ${activeTab === 'pairings' ? 'active' : ''}`}
          onClick={() => setActiveTab('pairings')}
        >
          💑 Guest Pairings
        </button>
        <button
          className={`tab-btn ${activeTab === 'emotional' ? 'active' : ''}`}
          onClick={() => setActiveTab('emotional')}
        >
          😊 Emotional Intelligence
        </button>
        <button
          className={`tab-btn ${activeTab === 'sentiment' ? 'active' : ''}`}
          onClick={() => setActiveTab('sentiment')}
        >
          💬 Sentiment Analysis
        </button>
      </div>

      {/* Tab Content */}
      <div className="ai-content">
        {/* Social Engagement Tab */}
        {activeTab === 'engagement' && (
          <div className="tab-content engagement-tab">
            <h2>Social Engagement Prediction</h2>
            
            {/* Real-time Engagement Metrics */}
            <div className="engagement-metrics">
              <h3>📊 Real-time Event Engagement</h3>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-label">Current Engagement Level</div>
                  <div className="metric-value">{predictions.realTimeAnalysis.currentEngagementLevel || 0}%</div>
                  <div className="metric-bar">
                    <div
                      className="metric-bar-fill"
                      style={{
                        width: `${predictions.realTimeAnalysis.currentEngagementLevel || 0}%`,
                        backgroundColor: predictions.realTimeAnalysis.currentEngagementLevel > 70 ? '#10b981' : predictions.realTimeAnalysis.currentEngagementLevel > 40 ? '#f59e0b' : '#ef4444',
                      }}
                    ></div>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Participation Rate</div>
                  <div className="metric-value">{predictions.realTimeAnalysis.participationRate || 0}%</div>
                  <div className="metric-info">of guests actively participating</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Engagement Trend</div>
                  <div className="metric-value">
                    {predictions.realTimeAnalysis.engagementTrends?.momentum === 'Increasing' && '📈'}
                    {predictions.realTimeAnalysis.engagementTrends?.momentum === 'Decreasing' && '📉'}
                    {predictions.realTimeAnalysis.engagementTrends?.momentum === 'Stable' && '➡️'}
                    {' '}{predictions.realTimeAnalysis.engagementTrends?.momentum || 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Interaction Predictions */}
            <div className="prediction-section">
              <h3>👥 Guest Interaction Profiles</h3>
              <div className="guests-prediction-grid">
                {predictions.interactions.map((interaction) => (
                  <div key={interaction.guestId} className="prediction-card">
                    <div className="card-header">
                      <h4>{interaction.guestName}</h4>
                      <span className="interaction-score">{interaction.interactionScore}% Social Score</span>
                    </div>
                    <div className="card-body">
                      <div className="prediction-item">
                        <span className="label">Interaction Style:</span>
                        <span className="value">{interaction.preferredInteractionStyle.name}</span>
                      </div>
                      <div className="prediction-item">
                        <span className="label">Optimal Group Size:</span>
                        <span className="value">{interaction.preferredInteractionStyle.optimalGroupSize} people</span>
                      </div>
                      <div className="prediction-item">
                        <span className="label">Suggestion:</span>
                        <span className="value">{interaction.preferredInteractionStyle.suggestion}</span>
                      </div>
                      {interaction.riskFactors.length > 0 && (
                        <div className="risk-section">
                          <span className="risk-label">⚠️ Risk Factors:</span>
                          <ul>
                            {interaction.riskFactors.map((risk, idx) => (
                              <li key={idx}>{risk.suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {predictions.realTimeAnalysis.recommendations && predictions.realTimeAnalysis.recommendations.length > 0 && (
              <div className="recommendations-section">
                <h3>💡 System Recommendations</h3>
                <div className="recommendations-list">
                  {predictions.realTimeAnalysis.recommendations.map((rec, idx) => (
                    <div key={idx} className={`recommendation-item priority-${rec.priority.toLowerCase()}`}>
                      <span className="priority-badge">{rec.priority}</span>
                      <div className="rec-content">
                        <strong>{rec.action}</strong>
                        <p>{rec.suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Networking Opportunities Tab */}
        {activeTab === 'networking' && (
          <div className="tab-content networking-tab">
            <h2>🤝 Networking Opportunities</h2>
            
            {predictions.networking.length > 0 ? (
              <div className="networking-grid">
                {predictions.networking.map((opportunity) => (
                  <div key={opportunity.id} className="networking-card">
                    <div className="card-header">
                      <h3>{opportunity.title}</h3>
                      <span className="participant-badge">{opportunity.participantCount} Guests</span>
                    </div>
                    <div className="card-body">
                      <p className="description">{opportunity.description}</p>
                      <div className="session-details">
                        <div className="detail-item">
                          <span className="icon">⏱️</span>
                          <span className="text">{opportunity.duration}</span>
                        </div>
                        <div className="detail-item">
                          <span className="icon">👥</span>
                          <span className="text">{opportunity.format}</span>
                        </div>
                        <div className="detail-item">
                          <span className="icon">⏰</span>
                          <span className="text">{opportunity.bestTime}</span>
                        </div>
                      </div>
                      <div className="participants-preview">
                        <strong>Participants:</strong>
                        <div className="participant-list">
                          {opportunity.suggestedParticipants.slice(0, 5).map((p) => (
                            <span key={p.id} className="participant-tag">{p.name}</span>
                          ))}
                          {opportunity.suggestedParticipants.length > 5 && (
                            <span className="participant-tag more">+{opportunity.suggestedParticipants.length - 5}</span>
                          )}
                        </div>
                      </div>
                      <button className="btn-schedule-session">Schedule This Session</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No networking opportunities suggested yet. Add more guests with similar interests.</p>
              </div>
            )}
          </div>
        )}

        {/* Guest Pairings Tab */}
        {activeTab === 'pairings' && (
          <div className="tab-content pairings-tab">
            <h2>💑 Recommended Guest Pairings</h2>
            
            {predictions.pairings.length > 0 ? (
              <div className="pairings-list">
                {predictions.pairings.map((pairing) => (
                  <div key={pairing.pairId} className="pairing-card">
                    <div className="pairing-header">
                      <div className="guests-pair">
                        <span className="guest">{pairing.guest1.name}</span>
                        <span className="separator">💑</span>
                        <span className="guest">{pairing.guest2.name}</span>
                      </div>
                      <span className="compatibility-badge">
                        {pairing.compatibilityScore}% Match
                      </span>
                    </div>
                    <div className="pairing-body">
                      {pairing.sharedInterests.length > 0 && (
                        <div className="shared-interests">
                          <strong>🎯 Shared Interests:</strong>
                          <div className="interests-list">
                            {pairing.sharedInterests.map((interest, idx) => (
                              <span key={idx} className="interest-tag">{interest}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="activity-suggestion">
                        <strong>💬 Suggested Activity:</strong>
                        <p>{pairing.suggestedActivity}</p>
                      </div>
                      <div className="interaction-prediction">
                        <strong>💭 Prediction:</strong>
                        <p>{pairing.interactionPrediction.icereakerSuggestion}</p>
                      </div>
                      {pairing.interactionPrediction.potentialChallenges.length > 0 && (
                        <div className="challenges">
                          <strong>⚠️ Potential Challenges:</strong>
                          <ul>
                            {pairing.interactionPrediction.potentialChallenges.map((challenge, idx) => (
                              <li key={idx}>{challenge}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <button className="btn-initiate-pairing">📞 Connect These Guests</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No guest pairings available. Add more guests to see recommended pairings.</p>
              </div>
            )}
          </div>
        )}

        {/* Emotional Intelligence Tab */}
        {activeTab === 'emotional' && (
          <div className="tab-content emotional-tab">
            <h2>😊 Emotional Intelligence & Well-being</h2>
            <div className="emotional-grid">
              {predictions.emotionalStates.map((profile) => (
                <div key={profile.guestId} className="emotional-card">
                  <div className="card-header">
                    <h4>{profile.guestName}</h4>
                    <span className={`emotion-badge ${profile.predictedEmotionalState.state}`}>
                      {profile.predictedEmotionalState.state.toUpperCase()}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="emotional-detail">
                      <span className="label">Current State:</span>
                      <span className="value">
                        {profile.predictedEmotionalState.state === 'excited' && '🎉'}
                        {profile.predictedEmotionalState.state === 'tired' && '😴'}
                        {profile.predictedEmotionalState.state === 'neutral' && '😐'}
                        {profile.predictedEmotionalState.state === 'disengaged' && '😔'}
                        {' '}{profile.predictedEmotionalState.state}
                      </span>
                    </div>
                    <div className="emotional-detail">
                      <span className="label">Energy Level:</span>
                      <span className="value">{profile.predictedEmotionalState.energyLevel}</span>
                    </div>
                    <div className="emotional-detail">
                      <span className="label">Stress Level:</span>
                      <span className="value">{profile.predictedEmotionalState.stressLevel}</span>
                    </div>

                    {profile.recommendedActivityType && (
                      <div className="recommended-activity">
                        <strong>💡 Recommended Activity:</strong>
                        <p className="activity-type">{profile.recommendedActivityType.type}</p>
                        <ul className="activity-suggestions">
                          {profile.recommendedActivityType.suggestions.map((suggestion, idx) => (
                            <li key={idx}>{suggestion}</li>
                          ))}
                        </ul>
                        <p className="duration">⏱️ Duration: {profile.recommendedActivityType.duration}</p>
                      </div>
                    )}

                    {profile.wellnessRecommendations.length > 0 && (
                      <div className="wellness-recommendations">
                        <strong>🧘 Wellness Recommendations:</strong>
                        <div className="wellness-list">
                          {profile.wellnessRecommendations.map((rec, idx) => (
                            <div key={idx} className="wellness-item">
                              <span className="priority">{rec.priority}</span>
                              <span className="text">{rec.suggestion}</span>
                              <span className="duration">({rec.duration})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sentiment Analysis Tab */}
        {activeTab === 'sentiment' && (
          <div className="tab-content sentiment-tab">
            <h2>💬 Sentiment & Feedback Analysis</h2>
            
            {predictions.sentimentTrends.totalFeedback > 0 ? (
              <>
                <div className="sentiment-summary">
                  <div className="summary-card positive">
                    <div className="count">{predictions.sentimentTrends.sentiments.positive}</div>
                    <div className="label">Positive Feedback</div>
                  </div>
                  <div className="summary-card neutral">
                    <div className="count">{predictions.sentimentTrends.sentiments.neutral}</div>
                    <div className="label">Neutral Feedback</div>
                  </div>
                  <div className="summary-card negative">
                    <div className="count">{predictions.sentimentTrends.sentiments.negative}</div>
                    <div className="label">Negative Feedback</div>
                  </div>
                  <div className="summary-card trend">
                    <div className="label">Overall Trend</div>
                    <div className={`trend-indicator ${predictions.sentimentTrends.trend}`}>
                      {predictions.sentimentTrends.trend}
                    </div>
                  </div>
                </div>

                {predictions.sentimentTrends.actionRequired && (
                  <div className="alert alert-danger">
                    <strong>⚠️ Action Required:</strong> Negative feedback is higher than positive. Consider immediate adjustments.
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state">
                <p>No feedback collected yet. Guest feedback will appear here once collected.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
