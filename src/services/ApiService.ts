import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token to requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Authentication
  login(email: string, password: string) {
    return this.client.post('/auth/login', { email, password });
  }

  logout() {
    localStorage.removeItem('authToken');
    return this.client.post('/auth/logout');
  }

  // Dashboard metrics
  getAlertsSummary() {
    return this.client.get('/metrics/alerts-summary');
  }

  getAlertsOverTime(fromDate?: string, toDate?: string) {
    return this.client.get('/metrics/alerts-over-time', {
      params: { fromDate, toDate },
    });
  }

  // Alerts
  getAlerts(params: any) {
    return this.client.get('/alerts', { params });
  }

  getAlertById(alertId: string) {
    return this.client.get(`/alerts/${alertId}`);
  }

  updateAlertStatus(alertId: string, status: string) {
    return this.client.patch(`/alerts/${alertId}/status`, { status });
  }

  assignAlert(alertId: string, assignedTo: string) {
    return this.client.patch(`/alerts/${alertId}/assign`, { assignedTo });
  }

  addComment(alertId: string, comment: string) {
    return this.client.post(`/alerts/${alertId}/comments`, { comment });
  }

  // Configuration
  getRules() {
    return this.client.get('/config/rules');
  }

  updateRule(ruleId: string, updates: any) {
    return this.client.patch(`/config/rules/${ruleId}`, updates);
  }
}

export default new ApiService();
