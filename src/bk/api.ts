// API Service for Laravel backend with Sanctum authentication

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean
}

class ApiService {
  private baseUrl: string
  token: string | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  setToken(token: string) {
    this.token = token
    localStorage.setItem("token", token)
  }

  loadToken() {
    this.token = localStorage.getItem("token")
  }

  clearToken() {
    this.token = null
    localStorage.removeItem("token")
  }

  // Get CSRF cookie before making authenticated requests
  async getCsrfCookie() {
    await fetch(`${this.baseUrl}/sanctum/csrf-cookie`, {
      credentials: "include",
    })
  }

  // Generic request method
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { requiresAuth = false, ...fetchOptions } = options

    // Get CSRF token if authentication is required
    if (requiresAuth) {
      //await this.getCsrfCookie()
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...fetchOptions.headers,
    }

    const config: RequestInit = {
      ...fetchOptions,
      headers,
      //credentials: "include", // Important for Sanctum cookies
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, config)

    // Handle errors
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "An error occurred",
      }))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return response.json()
    }

    return {} as T
  }

  // GET request
  async get<T>(endpoint: string, requiresAuth = false): Promise<T> {
    return this.request<T>(endpoint, {
      method: "GET",
      requiresAuth,
    })
  }

  // POST request
  async post<T>(endpoint: string, data?: unknown, requiresAuth = false): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      requiresAuth,
    })
  }

  // PUT request
  async put<T>(endpoint: string, data?: unknown, requiresAuth = false): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      requiresAuth,
    })
  }

  // DELETE request
  async delete<T>(endpoint: string, requiresAuth = false): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      requiresAuth,
    })
  }

  // Auth endpoints
  auth = {
    // Register new user
    register: async (data: {
      name: string
      email: string
      password: string
      password_confirmation: string
    }) => {
      return this.post("/api/v1/register", data, true)
    },

    // Login user
    login: async (data: { email: string; password: string }) => {
      return this.post("/api/v1/login", data, true)
    },

    // Logout user
    logout: async () => {
      return this.post("/api/v1/logout", {}, true)
    },

    // Get current user
    me: async () => {
      return this.get("/api/v1/me", true)
    },

    // Forgot password
    forgotPassword: async (data: { email: string }) => {
      return this.post("/api/v1/forgot-password", data, true)
    },

    // Reset password
    resetPassword: async (data: {
      email: string
      password: string
      password_confirmation: string
      token: string
    }) => {
      return this.post("/api/v1/reset-password", data, true)
    },
  }
}

// Export singleton instance
export const api = new ApiService(API_URL)
