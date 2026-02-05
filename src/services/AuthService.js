// Authentication Service
// Manages user authentication, login, and session state

const API_BASE_URL = "https://api.tbotechnology.in";

class AuthService {
  constructor() {
    this.currentUser = this.loadFromStorage();
    this.listeners = [];
  }

  // Subscribe to auth state changes
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  // Notify all listeners of auth state change
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentUser));
  }

  // Save to localStorage
  saveToStorage() {
    localStorage.setItem("auth_user", JSON.stringify(this.currentUser));
  }

  // Load from localStorage
  loadFromStorage() {
    try {
      const stored = localStorage.getItem("auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Error loading auth from storage:", error);
      return null;
    }
  }

  // Login with provided credentials
  async login(username, password) {
    try {
      // Validate credentials against the API
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      // Determine user role based on username or response
      // For demo: using predefined credentials
      let role = "client";
      if (
        username === "hackathontest" ||
        data.role === "admin" ||
        data.isAdmin
      ) {
        role = "admin";
      }

      this.currentUser = {
        username: username,
        role: role,
        token: data.token || `token_${Date.now()}`,
        loginTime: new Date().toISOString(),
        id: data.userId || `user_${Date.now()}`,
      };

      this.saveToStorage();
      this.notifyListeners();

      return {
        success: true,
        user: this.currentUser,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.message || "Login failed. Please try again.",
      };
    }
  }

  // Logout
  logout() {
    this.currentUser = null;
    localStorage.removeItem("auth_user");
    this.notifyListeners();
  }

  // Get current user
  getUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.currentUser !== null;
  }

  // Check if user is admin
  isAdmin() {
    return this.currentUser?.role === "admin";
  }

  // Check if user is client
  isClient() {
    return this.currentUser?.role === "client";
  }

  // Validate token (for API requests)
  getToken() {
    return this.currentUser?.token || null;
  }

  // Demo fallback: Check hardcoded test credentials
  validateTestCredentials(username, password) {
    const testUsername = "hackathontest";
    const testPassword = "Hackathon@12345";

    if (username === testUsername && password === testPassword) {
      return {
        valid: true,
        role: "admin",
      };
    }

    return {
      valid: false,
    };
  }
}

// Export singleton instance
export default new AuthService();
