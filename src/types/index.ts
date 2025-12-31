export interface Transaction {
  id: string;
  customerId: string;
  amount: number;
  currency: string;
  merchant: string;
  date: string;
  channel: 'web' | 'mobile' | 'atm' | 'pos';
  location?: string;
}

export interface Alert {
  id: string;
  transactionId: string;
  customerId: string;
  customerName: string;
  amount: number;
  currency: string;
  riskScore: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Under Review' | 'Resolved' | 'False Positive';
  type: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  transaction: Transaction;
  customerInfo?: {
    segment: string;
    kycCompleted: boolean;
    accountAge: string;
  };
  riskFactors: string[];
  triggeredRules?: string[];
  comments: Comment[];
  auditLog: AuditLogEntry[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details?: string;
}

export interface AlertsSummary {
  totalAlerts: number;
  openAlerts: number;
  highRiskAlerts: number;
  averageResolutionTime: number;
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  threshold?: number;
  riskLevel: 'High' | 'Medium' | 'Low';
}
