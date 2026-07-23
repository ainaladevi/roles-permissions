import { Eye, Settings, Download, MessageSquare, ShieldCheck } from 'lucide-react';

export const permissionCategories = [
  {
    name: 'Moderation',
    keys: [
      { id: 'moderation.view', label: 'View', icon: Eye },
      { id: 'moderation.act', label: 'Act', icon: Settings },
      { id: 'moderation.export', label: 'Export', icon: Download }
    ]
  },
  {
    name: 'Tickets',
    keys: [
      { id: 'tickets.view', label: 'View', icon: Eye },
      { id: 'tickets.reply', label: 'Reply', icon: MessageSquare },
      { id: 'tickets.manage', label: 'Manage', icon: Settings }
    ]
  },
  {
    name: 'Audit',
    keys: [
      { id: 'audit.view', label: 'View', icon: Eye },
      { id: 'audit.view_sensitive', label: 'View Sensitive', icon: ShieldCheck },
      { id: 'audit.export', label: 'Export', icon: Download }
    ]
  },
  {
    name: 'Settings',
    keys: [
      { id: 'settings.view', label: 'View', icon: Eye },
      { id: 'settings.edit', label: 'Edit', icon: Settings },
      { id: 'settings.security_edit', label: 'Security', icon: ShieldCheck },
      { id: 'settings.integrations_edit', label: 'Integrations', icon: Settings }
    ]
  }
];

export const rolesData = [
  {
    role_id: 'super_admin',
    name: 'Super Admin',
    users: 1,
    desc: 'Full access to every module including roles, audit logs, and settings.',
    color: 'var(--color-primary)',
    admins: [{name: 'Riya Kapoor', initials: 'RK', status: 'Active'}],
    permissions: [
      'moderation.view', 'moderation.act', 'moderation.export',
      'tickets.view', 'tickets.reply', 'tickets.manage',
      'audit.view', 'audit.view_sensitive', 'audit.export',
      'settings.view', 'settings.edit', 'settings.security_edit', 'settings.integrations_edit'
    ]
  },
  {
    role_id: 'moderator',
    name: 'Moderator',
    users: 4,
    desc: 'Can moderate content, handle basic tickets, and view non-sensitive audit logs.',
    color: '#8b5cf6',
    admins: [
      {name: 'Sam Torres', initials: 'ST', status: 'Active'},
      {name: 'Nadia Khan', initials: 'NK', status: 'Active'},
      {name: 'Leo Patel', initials: 'LP', status: 'Active'},
      {name: 'Maya Chen', initials: 'MC', status: 'Active'}
    ],
    permissions: [
      'moderation.view', 'moderation.act',
      'tickets.view', 'tickets.reply',
      'audit.view',
      'settings.view'
    ]
  },
  {
    role_id: 'support_agent',
    name: 'Support Agent',
    users: 12,
    desc: 'Frontline support. Can view and reply to tickets, but cannot manage them.',
    color: '#10b981',
    admins: [
      {name: 'Priya Desai', initials: 'PD', status: 'Active'},
      {name: 'David Kim', initials: 'DK', status: 'Inactive'},
      {name: 'Sarah Jones', initials: 'SJ', status: 'Active'}
    ],
    permissions: [
      'tickets.view', 'tickets.reply'
    ]
  },
  {
    role_id: 'analyst',
    name: 'Analyst',
    users: 2,
    desc: 'Read-only access to moderation, tickets, and audit logs for reporting.',
    color: '#f59e0b',
    admins: [
      {name: 'Alex Chen', initials: 'AC', status: 'Active'},
      {name: 'Maria Garcia', initials: 'MG', status: 'Active'}
    ],
    permissions: [
      'moderation.view', 'moderation.export',
      'tickets.view',
      'audit.view', 'audit.export'
    ]
  }
];

export const initialUsersData = [
  {
    id: 'USR-001',
    name: 'Rahul Kumar',
    email: 'rahul.k@example.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra, India',
    appliedDate: '2026-07-20T10:30:00Z',
    verificationStatus: 'Verified',
    applicationStatus: 'Pending',
    role: null,
    profilePic: null,
    initials: 'RK'
  },
  {
    id: 'USR-002',
    name: 'Priya Sharma',
    email: 'priya.s@example.com',
    phone: '+91 87654 32109',
    address: 'Delhi, India',
    appliedDate: '2026-07-21T09:15:00Z',
    verificationStatus: 'Pending',
    applicationStatus: 'Pending',
    role: null,
    profilePic: null,
    initials: 'PS'
  },
  {
    id: 'USR-003',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    phone: '+1 555-0198',
    address: 'San Francisco, CA, USA',
    appliedDate: '2026-06-15T14:20:00Z',
    verificationStatus: 'Verified',
    applicationStatus: 'Active',
    role: 'Analyst',
    profilePic: null,
    initials: 'AC'
  },
  {
    id: 'USR-004',
    name: 'Nadia Khan',
    email: 'nadia.k@example.com',
    phone: '+44 20 7946 0958',
    address: 'London, UK',
    appliedDate: '2026-05-10T11:00:00Z',
    verificationStatus: 'Verified',
    applicationStatus: 'Suspended',
    role: 'Moderator',
    profilePic: null,
    initials: 'NK'
  },
  {
    id: 'USR-005',
    name: 'James Wilson',
    email: 'j.wilson@example.com',
    phone: '+1 555-0123',
    address: 'Austin, TX, USA',
    appliedDate: '2026-07-18T16:45:00Z',
    verificationStatus: 'Failed',
    applicationStatus: 'Rejected',
    role: null,
    profilePic: null,
    initials: 'JW',
    rejectedBy: 'Super Admin',
    rejectReason: 'Identity verification failed.'
  }
];
