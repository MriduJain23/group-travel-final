/**
 * AI-Powered Social Intelligence Layer Service
 * Handles guest interaction prediction, networking opportunities, and emotional intelligence
 */

class AISocialIntelligenceService {
  constructor() {
    this.predictions = new Map();
    this.sentimentHistory = [];
    this.engagementMetrics = new Map();
  }

  // ===== SOCIAL ENGAGEMENT PREDICTION =====

  /**
   * Predict how guests might interact based on profiles and social graphs
   * @param {Array} guests - List of guests with profiles
   * @returns {Array} Guest interaction predictions
   */
  predictGuestInteractions(guests) {
    const predictions = [];

    for (const guest of guests) {
      const interactionProfile = {
        guestId: guest.id,
        guestName: guest.name,
        interactionScore: this.calculateInteractionScore(guest),
        socialPreferences: this.determineSocialPreferences(guest),
        preferredInteractionStyle: this.identifyInteractionStyle(guest),
        riskFactors: this.identifyRiskFactors(guest),
      };

      predictions.push(interactionProfile);
      this.predictions.set(guest.id, interactionProfile);
    }

    return predictions;
  }

  /**
   * Calculate interaction score for a guest (0-100)
   */
  calculateInteractionScore(guest) {
    let score = 50; // baseline

    // Factor 1: Social media activity level (0-20 points)
    if (guest.socialMediaActivity) {
      score += Math.min(guest.socialMediaActivity / 5, 20);
    }

    // Factor 2: Event attendance history (0-15 points)
    if (guest.eventAttendanceCount) {
      score += Math.min(guest.eventAttendanceCount * 1.5, 15);
    }

    // Factor 3: Shared interests (0-15 points)
    if (guest.interests && guest.interests.length > 0) {
      score += Math.min(guest.interests.length * 3, 15);
    }

    // Cap at 100
    return Math.min(score, 100);
  }

  /**
   * Determine social preferences from guest profile
   */
  determineSocialPreferences(guest) {
    return {
      networkingFriendly: guest.openToNetworking !== false,
      groupActivityPreference: guest.groupActivityPreference || 'moderate', // low, moderate, high
      introvertExtravert: this.analyzePersonalityTrait(guest),
      communicationStyle: guest.communicationStyle || 'balanced', // formal, casual, balanced
      interestAreas: guest.interests || [],
      professionalFocus: guest.professionalInterests || [],
      hobbyInterests: guest.hobbyInterests || [],
    };
  }

  /**
   * Identify interaction style (introvert/extravert/ambivert)
   */
  identifyInteractionStyle(guest) {
    const style = guest.personalityType || 'ambivert';
    const styleMap = {
      introvert: {
        name: 'Introvert',
        preference: 'Small group conversations',
        optimalGroupSize: 2-4,
        energyDrain: 'Large events',
        suggestion: 'One-on-one networking sessions',
      },
      extravert: {
        name: 'Extravert',
        preference: 'Large group activities',
        optimalGroupSize: 8-15,
        energyDrain: 'Quiet individual activities',
        suggestion: 'Group games and networking events',
      },
      ambivert: {
        name: 'Ambivert',
        preference: 'Flexible social engagement',
        optimalGroupSize: 4-8,
        energyDrain: 'Extreme social or solitary situations',
        suggestion: 'Balanced mix of group and small activities',
      },
    };

    return styleMap[style] || styleMap['ambivert'];
  }

  /**
   * Identify potential risk factors for guest engagement
   */
  identifyRiskFactors(guest) {
    const risks = [];

    if (guest.firstTimeEvent) {
      risks.push({ type: 'FIRST_TIME', severity: 'medium', suggestion: 'Assign buddy or welcome session' });
    }

    if (guest.introverted && guest.likesMixingWithStrangers === false) {
      risks.push({ type: 'SOCIAL_ANXIETY', severity: 'medium', suggestion: 'Provide structured small group activities' });
    }

    if (guest.languageBarrier) {
      risks.push({ type: 'LANGUAGE_BARRIER', severity: 'high', suggestion: 'Provide translator or language-matched groups' });
    }

    return risks;
  }

  // ===== NETWORKING OPPORTUNITIES =====

  /**
   * Suggest networking sessions based on guest interests
   * @param {Array} guests - List of guests
   * @returns {Array} Networking recommendations
   */
  suggestNetworkingOpportunities(guests) {
    const opportunities = [];
    const interestGroups = this.groupGuestsByInterests(guests);

    for (const [interest, groupMembers] of interestGroups) {
      if (groupMembers.length >= 2) {
        opportunities.push({
          id: `network_${interest}`,
          type: 'INTEREST_BASED_NETWORKING',
          interest: interest,
          title: `${interest} Networking Session`,
          description: `Connect with fellow enthusiasts interested in ${interest}`,
          suggestedParticipants: groupMembers.map(g => ({ id: g.id, name: g.name })),
          participantCount: groupMembers.length,
          duration: '45 minutes',
          format: 'Structured networking with icebreaker activities',
          bestTime: this.findOptimalSessionTime(groupMembers),
          expectedOutcome: `Build professional connections in ${interest}`,
        });
      }
    }

    return opportunities;
  }

  /**
   * Group guests by shared interests
   */
  groupGuestsByInterests(guests) {
    const interestMap = new Map();

    for (const guest of guests) {
      const interests = guest.interests || [];
      for (const interest of interests) {
        if (!interestMap.has(interest)) {
          interestMap.set(interest, []);
        }
        interestMap.get(interest).push(guest);
      }
    }

    return interestMap;
  }

  /**
   * Find optimal session time based on guest preferences
   */
  findOptimalSessionTime(guests) {
    // Simple algorithm: find common availability
    const timeSlots = ['Morning (9-11 AM)', 'Late Morning (11-1 PM)', 'Afternoon (2-4 PM)', 'Early Evening (5-7 PM)'];
    
    // Count preferences
    const preferences = timeSlots.map(slot => ({
      slot,
      score: guests.filter(g => g.preferredTimeSlots?.includes(slot)).length,
    }));

    const best = preferences.sort((a, b) => b.score - a.score)[0];
    return best?.slot || 'Afternoon (2-4 PM)';
  }

  // ===== GUEST PAIRING =====

  /**
   * Identify ideal guest pairings for activities
   * @param {Array} guests - List of guests
   * @param {String} activity - Type of activity
   * @returns {Array} Recommended guest pairings
   */
  suggestGuestPairings(guests, activity = 'general') {
    const pairings = [];
    const compatibility = this.calculateGuestCompatibility(guests);

    // Sort by compatibility score
    const sortedPairs = Array.from(compatibility.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, Math.floor(guests.length / 2)); // Limit to reasonable number

    for (const [pairKey, score] of sortedPairs) {
      const [guest1Id, guest2Id] = pairKey.split('_');
      const guest1 = guests.find(g => g.id === guest1Id);
      const guest2 = guests.find(g => g.id === guest2Id);

      if (guest1 && guest2) {
        pairings.push({
          pairId: pairKey,
          guest1: { id: guest1.id, name: guest1.name },
          guest2: { id: guest2.id, name: guest2.name },
          compatibilityScore: Math.round(score * 100),
          sharedInterests: this.findSharedInterests(guest1, guest2),
          suggestedActivity: this.suggestActivityForPair(guest1, guest2, activity),
          interactionPrediction: this.predictPairInteraction(guest1, guest2),
        });
      }
    }

    return pairings;
  }

  /**
   * Calculate compatibility between all guest pairs
   */
  calculateGuestCompatibility(guests) {
    const compatibility = new Map();

    for (let i = 0; i < guests.length; i++) {
      for (let j = i + 1; j < guests.length; j++) {
        const guest1 = guests[i];
        const guest2 = guests[j];
        const pairKey = `${guest1.id}_${guest2.id}`;

        let score = 0.5; // baseline

        // Shared interests boost compatibility
        const sharedInterests = (guest1.interests || []).filter(i =>
          (guest2.interests || []).includes(i)
        );
        score += sharedInterests.length * 0.15;

        // Similar personality types boost compatibility
        if (guest1.personalityType === guest2.personalityType) {
          score += 0.2;
        }

        // Complementary personality types
        if (
          (guest1.personalityType === 'introvert' && guest2.personalityType === 'extravert') ||
          (guest1.personalityType === 'extravert' && guest2.personalityType === 'introvert')
        ) {
          score += 0.15;
        }

        // Professional background match
        if (guest1.professionalIndustry === guest2.professionalIndustry) {
          score += 0.1;
        }

        // Hobbyist interests match
        const sharedHobbies = (guest1.hobbyInterests || []).filter(h =>
          (guest2.hobbyInterests || []).includes(h)
        );
        score += sharedHobbies.length * 0.1;

        compatibility.set(pairKey, Math.min(score, 1));
      }
    }

    return compatibility;
  }

  /**
   * Find shared interests between two guests
   */
  findSharedInterests(guest1, guest2) {
    const interests1 = new Set(guest1.interests || []);
    const interests2 = new Set(guest2.interests || []);
    return Array.from(interests1).filter(i => interests2.has(i));
  }

  /**
   * Suggest activity for a guest pair
   */
  suggestActivityForPair(guest1, guest2, activity) {
    const sharedInterests = this.findSharedInterests(guest1, guest2);
    
    if (sharedInterests.includes('sports')) return 'Team sports or golf activity';
    if (sharedInterests.includes('travel')) return 'Travel story sharing session';
    if (sharedInterests.includes('technology')) return 'Tech talk or innovation workshop';
    if (sharedInterests.includes('food')) return 'Culinary experience or food tasting';
    if (sharedInterests.includes('arts')) return 'Art gallery tour or creative workshop';
    
    return 'General networking or dinner conversation';
  }

  /**
   * Predict interaction quality for a pair
   */
  predictPairInteraction(guest1, guest2) {
    const prediction = {
      engagementPotential: 'High',
      conversationStarterTopics: this.findSharedInterests(guest1, guest2),
      potentialChallenges: [],
      icereakerSuggestion: '',
    };

    // Check for potential challenges
    if (guest1.language !== guest2.language && guest1.language !== 'English' && guest2.language !== 'English') {
      prediction.potentialChallenges.push('Language barrier');
    }

    // Suggest icebreaker
    const sharedInterests = this.findSharedInterests(guest1, guest2);
    if (sharedInterests.length > 0) {
      prediction.icereakerSuggestion = `"I noticed we both enjoy ${sharedInterests[0]}! Have you tried...?"`;
    } else {
      prediction.icereakerSuggestion = `"What brings you to this event? Are you looking to meet new people or learn about ${guest1.interests?.[0] || 'the destination'}?"`;
    }

    return prediction;
  }

  // ===== DYNAMIC SOCIAL SCHEDULING =====

  /**
   * Analyze real-time guest engagement
   * @param {Object} eventData - Current event data
   * @returns {Object} Engagement analysis and recommendations
   */
  analyzeRealTimeEngagement(eventData) {
    const analysis = {
      currentEngagementLevel: this.calculateEngagementLevel(eventData),
      participationRate: this.calculateParticipationRate(eventData),
      engagementTrends: this.identifyEngagementTrends(eventData),
      recommendations: [],
      suggestedScheduleAdjustments: [],
    };

    // Generate recommendations
    if (analysis.currentEngagementLevel < 40) {
      analysis.recommendations.push({
        priority: 'HIGH',
        action: 'Boost engagement with high-energy activity',
        suggestion: 'Switch to team games, icebreakers, or impromptu networking',
      });
    }

    if (analysis.participationRate < 60) {
      analysis.recommendations.push({
        priority: 'MEDIUM',
        action: 'Increase participation',
        suggestion: 'Make current activity more inclusive or switch to optional interest groups',
      });
    }

    return analysis;
  }

  /**
   * Calculate overall engagement level (0-100)
   */
  calculateEngagementLevel(eventData) {
    let score = 50;

    if (eventData.activeParticipants) {
      score = (eventData.activeParticipants / eventData.totalGuests) * 100;
    }

    if (eventData.feedbackScore) {
      score = (score + eventData.feedbackScore) / 2;
    }

    return Math.round(score);
  }

  /**
   * Calculate participation rate (0-100)
   */
  calculateParticipationRate(eventData) {
    if (!eventData.totalGuests || eventData.totalGuests === 0) return 0;
    return Math.round((eventData.activeParticipants / eventData.totalGuests) * 100);
  }

  /**
   * Identify engagement trends
   */
  identifyEngagementTrends(eventData) {
    return {
      momentum: eventData.engagementScore > 70 ? 'Increasing' : eventData.engagementScore < 40 ? 'Decreasing' : 'Stable',
      peakActivityTime: this.findPeakActivityTime(eventData),
      lowActivityPeriods: this.findLowActivityPeriods(eventData),
    };
  }

  findPeakActivityTime(eventData) {
    return eventData.peakActivityTime || '2-4 PM';
  }

  findLowActivityPeriods(eventData) {
    return eventData.lowActivityPeriods || ['After lunch (1-2 PM)'];
  }

  /**
   * Suggest schedule adjustments based on engagement
   */
  suggestScheduleAdjustments(currentSchedule, engagementData) {
    const adjustments = [];

    if (engagementData.engagementLevel < 40) {
      adjustments.push({
        type: 'ACTIVITY_SWAP',
        reason: 'Low engagement with current activity',
        suggestion: 'Replace current activity with high-energy team game',
      });
    }

    if (engagementData.participationRate < 60) {
      adjustments.push({
        type: 'BREAK_INSERTION',
        reason: 'Guest fatigue detected',
        suggestion: 'Insert 15-minute wellness break with refreshments',
      });
    }

    return adjustments;
  }

  // ===== EMOTIONALLY-DRIVEN CUSTOMIZATION =====

  /**
   * Predict guest emotional states and suggest optimal activities
   * @param {Array} guests - List of guests
   * @returns {Array} Emotional profile and activity recommendations
   */
  predictGuestEmotionalStates(guests) {
    const emotionalProfiles = [];

    for (const guest of guests) {
      const profile = {
        guestId: guest.id,
        guestName: guest.name,
        predictedEmotionalState: this.analyzeEmotionalState(guest),
        recommendedActivityType: this.suggestActivityByEmotionalState(guest),
        wellnessRecommendations: this.generateWellnessRecommendations(guest),
      };

      emotionalProfiles.push(profile);
    }

    return emotionalProfiles;
  }

  /**
   * Analyze emotional state from social media activity and feedback
   */
  analyzeEmotionalState(guest) {
    let dominantEmotion = 'neutral';
    let confidence = 0.5;
    const emotionalIndicators = {};

    // Analyze social media activity
    if (guest.recentSocialActivity) {
      const activitySentiment = this.analyzeSocialMediaSentiment(guest.recentSocialActivity);
      emotionalIndicators['social_engagement'] = activitySentiment;
    }

    // Check app feedback if any
    if (guest.appFeedbackHistory && guest.appFeedbackHistory.length > 0) {
      const recentFeedback = guest.appFeedbackHistory[guest.appFeedbackHistory.length - 1];
      emotionalIndicators['app_feedback'] = recentFeedback;
    }

    // Determine dominant emotion
    if (guest.energyLevel === 'low') {
      dominantEmotion = 'tired';
    } else if (guest.engagementScore > 80) {
      dominantEmotion = 'excited';
    } else if (guest.engagementScore < 30) {
      dominantEmotion = 'disengaged';
    }

    return {
      state: dominantEmotion,
      confidence: Math.min(0.5 + (guest.appFeedbackHistory?.length || 0) * 0.1, 1),
      indicators: emotionalIndicators,
      energyLevel: guest.energyLevel || 'moderate',
      stressLevel: guest.stressLevel || 'normal',
    };
  }

  /**
   * Analyze sentiment from social media activity
   */
  analyzeSocialMediaSentiment(activity) {
    if (!activity) return 'neutral';

    const positiveKeywords = ['exciting', 'amazing', 'love', 'great', 'wonderful', 'fantastic'];
    const negativeKeywords = ['boring', 'tired', 'stressed', 'disappointed', 'frustrated'];

    const activityLower = activity.toLowerCase();
    const positiveMatches = positiveKeywords.filter(k => activityLower.includes(k)).length;
    const negativeMatches = negativeKeywords.filter(k => activityLower.includes(k)).length;

    if (positiveMatches > negativeMatches) return 'positive';
    if (negativeMatches > positiveMatches) return 'negative';
    return 'neutral';
  }

  /**
   * Suggest activity based on emotional state
   */
  suggestActivityByEmotionalState(guest) {
    const state = guest.emotionalState?.state || 'neutral';

    const activityMap = {
      excited: {
        type: 'High-Energy Activities',
        suggestions: ['Team sports', 'Group games', 'Dance or music events', 'Adventure activities'],
        duration: '60+ minutes',
      },
      neutral: {
        type: 'Balanced Activities',
        suggestions: ['Networking sessions', 'Skill-building workshops', 'Cultural events', 'Casual networking'],
        duration: '45-60 minutes',
      },
      tired: {
        type: 'Relaxing Activities',
        suggestions: ['Spa/wellness session', 'Meditation break', 'Scenic walk', 'Casual conversation'],
        duration: '30-45 minutes',
      },
      disengaged: {
        type: 'Re-engagement Activities',
        suggestions: ['Interest-based small group', 'One-on-one mentoring', 'Personalized consulting', 'VIP experience'],
        duration: '30-45 minutes',
      },
    };

    return activityMap[state] || activityMap['neutral'];
  }

  /**
   * Generate personalized wellness recommendations
   */
  generateWellnessRecommendations(guest) {
    const recommendations = [];

    if (guest.stressLevel === 'high') {
      recommendations.push({
        type: 'STRESS_MANAGEMENT',
        suggestion: 'Mindfulness session or quiet break',
        duration: '15 minutes',
        priority: 'HIGH',
      });
    }

    if (guest.energyLevel === 'low') {
      recommendations.push({
        type: 'ENERGY_BOOST',
        suggestion: 'Light snack and refreshment break',
        duration: '10 minutes',
        priority: 'HIGH',
      });
    }

    if (guest.socialExhaustion) {
      recommendations.push({
        type: 'SOCIAL_RECOVERY',
        suggestion: 'Quiet time or one-on-one conversation',
        duration: '20 minutes',
        priority: 'MEDIUM',
      });
    }

    return recommendations;
  }

  // ===== SENTIMENT ANALYSIS & REAL-TIME ADJUSTMENTS =====

  /**
   * Track and analyze sentiment from guest feedback
   * @param {Object} feedback - Guest feedback data
   */
  trackSentiment(feedback) {
    const sentimentEntry = {
      timestamp: new Date(),
      guestId: feedback.guestId,
      sentiment: this.analyzeSentiment(feedback.text),
      score: feedback.rating || 0,
      topic: feedback.topic || 'general',
      rawFeedback: feedback.text,
    };

    this.sentimentHistory.push(sentimentEntry);
    return sentimentEntry;
  }

  /**
   * Analyze sentiment from text feedback
   */
  analyzeSentiment(text) {
    if (!text) return 'neutral';

    const positiveWords = ['great', 'wonderful', 'amazing', 'loved', 'excellent', 'fantastic', 'awesome'];
    const negativeWords = ['terrible', 'bad', 'poor', 'disappointing', 'awful', 'hate', 'boring'];

    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  /**
   * Get sentiment trends over time
   */
  getSentimentTrends(timeWindowMinutes = 60) {
    const now = new Date();
    const windowStart = new Date(now.getTime() - timeWindowMinutes * 60000);

    const recentFeedback = this.sentimentHistory.filter(
      entry => new Date(entry.timestamp) > windowStart
    );

    const sentimentCounts = {
      positive: recentFeedback.filter(f => f.sentiment === 'positive').length,
      neutral: recentFeedback.filter(f => f.sentiment === 'neutral').length,
      negative: recentFeedback.filter(f => f.sentiment === 'negative').length,
    };

    return {
      timeWindow: `Last ${timeWindowMinutes} minutes`,
      totalFeedback: recentFeedback.length,
      sentiments: sentimentCounts,
      trend: this.determineTrend(sentimentCounts),
      actionRequired: sentimentCounts.negative > sentimentCounts.positive,
    };
  }

  /**
   * Determine overall sentiment trend
   */
  determineTrend(sentimentCounts) {
    const total = sentimentCounts.positive + sentimentCounts.neutral + sentimentCounts.negative;
    if (total === 0) return 'insufficient_data';

    const positiveRatio = sentimentCounts.positive / total;
    if (positiveRatio > 0.6) return 'very_positive';
    if (positiveRatio > 0.4) return 'positive';
    if (positiveRatio < 0.2) return 'negative';
    return 'neutral';
  }

  /**
   * Suggest adjustments based on sentiment analysis
   */
  suggestAdjustmentsBasedOnSentiment(sentimentTrends) {
    const suggestions = [];

    if (sentimentTrends.trend === 'negative') {
      suggestions.push({
        priority: 'CRITICAL',
        action: 'Address guest satisfaction immediately',
        options: [
          'Pause current activity and gather feedback',
          'Offer alternative preferred activities',
          'Provide personalized attention to unhappy guests',
        ],
      });
    }

    if (sentimentTrends.trend === 'positive') {
      suggestions.push({
        priority: 'LOW',
        action: 'Maintain current experience',
        options: ['Continue scheduled activities', 'Reinforce what\'s working well'],
      });
    }

    return suggestions;
  }

  // ===== HELPER METHODS =====

  analyzePersonalityTrait(guest) {
    const type = guest.personalityType || 'ambivert';
    const traits = {
      introvert: 'Reserved, prefers small groups',
      extravert: 'Outgoing, enjoys large groups',
      ambivert: 'Balanced, flexible social style',
    };
    return traits[type] || traits['ambivert'];
  }
}

export default new AISocialIntelligenceService();
