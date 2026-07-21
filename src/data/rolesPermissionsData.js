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
