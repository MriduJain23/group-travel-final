/**
 * Event Coordination Service
 * Manages event microsites, itineraries, schedules, and personalized guest information
 * Handles centralized coordination for group events (weddings, conferences, MICE)
 */

const API = import.meta.env.VITE_API_URL; // Render backend

class EventCoordinationService {
  /* ================= STATIC DEMO DATA ================= */

  static events = [
    {
      id: 1,
      name: "Sharma–Verma Wedding",
      type: "wedding",
      description: "Destination wedding with 200+ guests",
      location: "Gangtok, Sikkim",
      startDate: "2024-12-20",
      endDate: "2024-12-22",
      status: "confirmed",
      organizer: "Priya Sharma",
      logo: "💍",
      hotel: "Grand Himalayan Resort",
      guestCount: 230,
      budget: "₹50,00,000"
    },
    {
      id: 2,
      name: "TechConf 2024",
      type: "conference",
      description: "International Tech Conference with 500+ attendees",
      location: "Bangalore, India",
      startDate: "2024-11-15",
      endDate: "2024-11-17",
      status: "confirmed",
      organizer: "Tech India Inc.",
      logo: "💻",
      hotel: "Bangalore Convention Center",
      guestCount: 520,
      budget: "₹1,50,00,000"
    },
    {
      id: 3,
      name: "Annual MICE Retreat",
      type: "mice",
      description: "Corporate team building and networking event",
      location: "Goa, India",
      startDate: "2024-10-10",
      endDate: "2024-10-13",
      status: "planning",
      organizer: "Corporate Events Ltd.",
      logo: "🏢",
      hotel: "Taj Exotica Resort",
      guestCount: 150,
      budget: "₹25,00,000"
    }
  ];

  static schedules = [
    {
      id: 1,
      eventId: 1,
      day: 1,
      date: "2024-12-20",
      title: "Arrival & Welcome",
      activities: [
        { time: "14:00-16:00", name: "Guest Arrival & Check-in", location: "Grand Himalayan Resort" },
        { time: "17:00-18:00", name: "Welcome Tea", location: "Grand Ballroom" },
        { time: "19:00-21:00", name: "Welcome Dinner", location: "Grand Dining Hall", dietary: true }
      ]
    },
    {
      id: 2,
      eventId: 1,
      day: 2,
      date: "2024-12-21",
      title: "Wedding Day",
      activities: [
        { time: "08:00-09:00", name: "Breakfast", location: "Hotel Restaurant" },
        { time: "09:00-14:00", name: "Pre-Wedding Photography", location: "Hotel Gardens" },
        { time: "14:00-15:30", name: "Lunch", location: "Multi-Cuisine Restaurant", dietary: true },
        { time: "17:00-19:00", name: "Wedding Ceremony", location: "Grand Lawn", formal: true },
        { time: "19:00-22:00", name: "Wedding Reception", location: "Grand Ballroom", dietary: true }
      ]
    }
  ];

  static itineraries = {
    1: {
      guestId: 1,
      eventId: 1,
      personalItinerary: [
        { day: 1, activity: "Arrival at 14:30", notes: "Room 501, Deluxe Double" },
        { day: 2, activity: "Wedding Ceremony at 17:00", notes: "Formal attire required" },
        { day: 3, activity: "Checkout at 12:00", notes: "Hotel checkout time" }
      ]
    }
  };

  static guestPersonalization = {
    1: {
      guestId: 1,
      eventId: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      diningPreferences: ["Vegetarian"],
      emergencyContact: "+91-9876543210"
    }
  };

  static updates = [
    { id: 1, eventId: 1, timestamp: new Date(), type: "schedule", message: "Dinner time updated", severity: "info", read: false }
  ];

  /* ================= HELPERS ================= */

  static getEventById(id) { return this.events.find(e => e.id === id); }
  static getEventSchedule(id) { return this.schedules.filter(s => s.eventId === id); }
  static getGuestItinerary(id) { return this.itineraries[id] || null; }
  static getGuestPersonalization(id) { return this.guestPersonalization[id] || null; }
  static getEventUpdates(id) { return this.updates.filter(u => u.eventId === id); }
  static getEventGuests(eventId) { return Object.values(this.guestPersonalization).filter(g => g.eventId === eventId); }

  /* ================= ADMIN SAFE CRUD ================= */

  static async getAllEvents(filter = {}) {
    try {
      const q = new URLSearchParams(filter).toString();
      const res = await fetch(`${API}/api/events?${q}`);
      if (!res.ok) throw new Error("Backend failed");
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem("admin_events", JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn("Using fallback:", e.message);
    }

    const local = localStorage.getItem("admin_events");
    if (local) return JSON.parse(local);

    return this.events;
  }

  static async createEvent(eventData) {
    try {
      const res = await fetch(`${API}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData)
      });
      const data = await res.json();

      const local = JSON.parse(localStorage.getItem("admin_events") || "[]");
      local.push(data);
      localStorage.setItem("admin_events", JSON.stringify(local));
      return data;
    } catch {
      const local = JSON.parse(localStorage.getItem("admin_events") || "[]");
      const fake = { ...eventData, id: Date.now() };
      local.push(fake);
      localStorage.setItem("admin_events", JSON.stringify(local));
      return fake;
    }
  }

  static async deleteEvent(eventId) {
    try {
      await fetch(`${API}/api/events/${eventId}`, { method: "DELETE" });
    } catch {}

    const local = JSON.parse(localStorage.getItem("admin_events") || "[]");
    const updated = local.filter(e => e.id !== eventId);
    localStorage.setItem("admin_events", JSON.stringify(updated));
    return true;
  }
}

export default EventCoordinationService;
