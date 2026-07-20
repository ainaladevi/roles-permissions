import React from 'react';
import { Shield, Edit2, UserX } from 'lucide-react';
import './RoleDetailView.css';

const RoleDetailView = ({ role, showToast }) => {
  if (!role) return null;

  const permissionCategories = [
    {
      name: 'Moderation',
      keys: ['moderation.view', 'moderation.act', 'moderation.export']
    },
    {
      name: 'Tickets',
      keys: ['tickets.view', 'tickets.reply', 'tickets.manage']
    },
    {
      name: 'Audit',
      keys: ['audit.view', 'audit.view_sensitive', 'audit.export']
    },
    {
      name: 'Settings',
      keys: ['settings.view', 'settings.edit', 'settings.security_edit', 'settings.integrations_edit']
    }
  ];

  return (
    <div className="role-detail-view d-flex flex-column gap-3 mx-auto" style={{ maxWidth: '1400px' }}>
      
      <div className="card">
        <div 
          className="role-badge"
          style={{ 
            backgroundColor: `color-mix(in srgb, ${role.color} 15%, transparent)`, 
            color: role.color 
          }}
        >
          <Shield size={16} className="me-2" />
          <span className="fw-bold" style={{ fontSize: '13px' }}>{role.name}</span>
        </div>
        <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
          {role.desc}
        </p>
      </div>

      <div className="card p-0">
        <div className="p-4 border-bottom" style={{ borderColor: 'var(--color-divider) !important' }}>
          <h6 className="fw-bold mb-0">Permission access</h6>
        </div>
        <div className="module-list">
          {permissionCategories.map((cat, catIdx) => (
            <React.Fragment key={catIdx}>
              <div className="px-4 py-2 fw-bold" style={{ color: 'var(--color-text-muted)', fontSize: '11px', letterSpacing: '0.5px', backgroundColor: 'var(--color-surface-offset)' }}>
                {cat.name.toUpperCase()}
              </div>
              {cat.keys.map((key, idx) => {
                const isApproved = role.permissions?.includes(key);
                return (
                  <div key={idx} className="module-item">
                    <span style={{ fontSize: '14px' }}>{key}</span>
                    <div className={`status-pill ${isApproved ? 'approved' : 'rejected'}`}>
                      {isApproved ? 'Approved' : 'Rejected'}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="card p-0">
        <div className="p-4 border-bottom" style={{ borderColor: 'var(--color-divider) !important' }}>
          <h6 className="fw-bold mb-0">Admins with this role</h6>
        </div>
        <div className="table-responsive">
          <table className="table table-borderless admins-table mb-0">
            <thead>
              <tr>
                <th className="fw-bold table-header ps-4">ADMIN</th>
                <th className="fw-bold table-header text-center">STATUS</th>
                <th className="fw-bold table-header text-end pe-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {role.admins?.map((admin, idx) => (
                <tr key={idx}>
                  <td className="py-2 ps-4 align-middle">
                    <div className="d-flex align-items-center gap-3">
                      <div className="admin-avatar">
                        {admin.initials}
                      </div>
                      <span style={{ fontSize: '14px' }}>{admin.name}</span>
                    </div>
                  </td>
                  <td className="py-2 align-middle text-center">
                    <div className={`status-pill ${admin.status === 'Active' ? 'approved' : 'muted'}`}>
                      {admin.status}
                    </div>
                  </td>
                  <td className="py-2 pe-4 align-middle text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <button className="icon-btn border-0 bg-transparent" aria-label="Edit user" onClick={() => showToast(`Edit user ${admin.name}`)}>
                        <Edit2 size={16} />
                      </button>
                      <button className="icon-btn border-0 bg-transparent" aria-label="Remove user" onClick={() => showToast(`User ${admin.name} removed`)}>
                        <UserX size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!role.admins?.length && (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-muted">No admins assigned.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default RoleDetailView;
