export const rolesData = [
  {name:'Super Admin',users:1,desc:'Full access to every module including roles, audit logs, and settings.',color:'var(--color-primary)', admins: [{name: 'Riya Kapoor', initials: 'RK', status: 'Active'}]},
  {name:'Moderator',users:2,desc:'Reviews and actions reported content, posts, comments, and messages.',color:'var(--color-blue)', admins: [{name: 'John Doe', initials: 'JD', status: 'Active'}, {name: 'Jane Smith', initials: 'JS', status: 'Inactive'}]},
  {name:'Support Agent',users:1,desc:'Handles user support tickets, replies, and account-level troubleshooting.',color:'var(--color-success)', admins: [{name: 'Alice Wong', initials: 'AW', status: 'Active'}]},
  {name:'Analyst',users:1,desc:'Read-only access to dashboards, reports, and audit trails for insight work.',color:'var(--color-purple)', admins: [{name: 'Bob Ross', initials: 'BR', status: 'Active'}]}
];
