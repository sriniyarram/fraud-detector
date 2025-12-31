# Fraud Detector - Transaction Anomaly & Fraud Detection Application

A comprehensive React web application for monitoring, investigating, and managing suspicious financial transactions in near real-time.

## 📋 Features

### Dashboard
- **KPI Cards**: Display total alerts, open alerts, high-risk alerts, and average resolution time
- **Charts**: 
  - Line chart showing alerts over time
  - Bar chart showing risk level distribution
- **Real-time metrics** for fraud monitoring

### Alerts Management
- **Advanced Filtering**:
  - Search by Alert ID, Transaction ID, or Customer Name
  - Filter by Status (Open, Under Review, Resolved, False Positive)
  - Filter by Risk Level (High, Medium, Low)
  - Date range filtering
- **Pagination** support for large datasets
- **Quick actions** to view alert details

### Alert Details
- **Comprehensive alert information**:
  - Transaction summary with merchant details
  - Customer information and KYC status
  - Risk score and risk factors
  - Triggered detection rules
  - Timeline of related events
- **Workflow actions**:
  - Change alert status
  - Assign/reassign alerts
  - Add comments and internal notes
  - View complete audit log

### Configuration
- **Risk Score Boundaries**: Configure thresholds for High/Medium/Low risk classification
- **Rule Management**:
  - Enable/disable rules
  - View and edit rule thresholds
  - Toggle individual detection rules
- **Persistent settings** save

### Security & UI
- **Login page** with email/password authentication
- **Role-based navigation** sidebar (Analyst, Manager, Admin)
- **Material UI** for professional and clean interface
- **Responsive design** for desktop and tablet usage

## 🛠️ Technology Stack

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Material UI (MUI)** - Component library
- **React Router** - Navigation
- **React Query** - Server state management
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **date-fns** - Date manipulation

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone/Navigate to the project**:
   ```bash
   cd c:\Work\TansactionAnomalyFraudDetector
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create .env file** (already included with default values):
   ```env
   REACT_APP_API_URL=http://localhost:3001/api
   REACT_APP_ENV=development
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open your browser**:
   ```
   http://localhost:3000
   ```

## 🔑 Demo Credentials

- **Email**: analyst@example.com
- **Password**: any password

## 📁 Project Structure

```
src/
├── components/
│   └── Layout.tsx              # Main layout with sidebar navigation
├── pages/
│   ├── Login.tsx               # Authentication page
│   ├── Dashboard.tsx           # Main dashboard with metrics
│   ├── AlertsList.tsx          # Alerts list with filters
│   ├── AlertDetail.tsx         # Detailed alert view with actions
│   └── Configuration.tsx       # Rules and settings management
├── services/
│   └── ApiService.ts           # API communication
├── utils/
│   └── AuthContext.tsx         # Authentication context
├── types/
│   └── index.ts               # TypeScript type definitions
├── App.tsx                     # Main app component
└── index.tsx                   # Entry point
```

## 🔗 API Integration

The application expects the following REST API endpoints (configure in `.env`):

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Dashboard
- `GET /api/metrics/alerts-summary` - Get KPI metrics
- `GET /api/metrics/alerts-over-time` - Get time-series data

### Alerts
- `GET /api/alerts` - List alerts with filters
- `GET /api/alerts/{alertId}` - Get alert details
- `PATCH /api/alerts/{alertId}/status` - Update alert status
- `PATCH /api/alerts/{alertId}/assign` - Assign alert
- `POST /api/alerts/{alertId}/comments` - Add comment

### Configuration
- `GET /api/config/rules` - Get detection rules
- `PATCH /api/config/rules/{ruleId}` - Update rule

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## 📝 Notes

- **Mock Data**: The current implementation uses mock data. Replace API service calls with actual backend endpoints.
- **Authentication**: Currently uses local storage. Implement proper JWT/OAuth flow for production.
- **State Management**: Uses React Context for auth and React Query for server state. Consider Redux Toolkit for larger apps.
- **Error Handling**: Add comprehensive error boundaries and error messages for production use.

## 🔄 Features for Future Enhancement

1. Advanced role-based access control (RBAC)
2. Real-time WebSocket notifications
3. Bulk operations on multiple alerts
4. ML model explainability visualizations
5. Custom report generation
6. Alert escalation workflows
7. Integration with external ticketing systems
8. Export functionality (CSV, PDF)
9. Advanced analytics dashboard
10. Two-factor authentication

## 📞 Support

For questions or issues, contact the development team.

## 📄 License

Proprietary - All rights reserved.
