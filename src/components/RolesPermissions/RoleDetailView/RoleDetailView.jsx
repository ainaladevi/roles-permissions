import React from 'react';
import { Shield, Edit2, UserX } from 'lucide-react';
import './RoleDetailView.css';

const RoleDetailView = ({ role, showToast }) => {
  if (!role) return null;

  const modules = [
    'Dashboard', 
    'Content moderation', 
    'Reports', 
    'Verification', 
    'Messages', 
    'Support Agent Desk', 
    'Roles & permissions', 
    'Audit logs', 
    'Settings'
  ];

  const getInitialCheck = (moduleName, roleName) => {
    const roleLower = roleName.toLowerCase();
    if (roleLower.includes('super admin')) return true;
    if (roleLower.includes('moderator') || roleLower.includes('manager') || roleLower.includes('l2')) {
      const denied = ['Roles & permissions', 'Audit logs', 'Settings', 'Support Agent Desk'];
      return !denied.includes(moduleName);
    }
    if (roleLower.includes('support agent')) {
      const allowed = ['Dashboard', 'Reports', 'Messages', 'Support Agent Desk'];
      return allowed.includes(moduleName);
    }
    if (roleLower.includes('analyst') || roleLower.includes('l1')) {
      const allowed = ['Dashboard', 'Reports', 'Audit logs'];
      return allowed.includes(moduleName);
    }
    return false;
  };

  const approvedModules = modules.filter(m => getInitialCheck(m, role.name));

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
          <h6 className="fw-bold mb-0">Module access</h6>
        </div>
        <div className="module-list">
          {modules.map((moduleName, idx) => {
            const isApproved = getInitialCheck(moduleName, role.name);
            return (
              <div key={idx} className="module-item">
                <span style={{ fontSize: '14px' }}>{moduleName}</span>
                <div className={`status-pill ${isApproved ? 'approved' : 'rejected'}`}>
                  {isApproved ? 'Approved' : 'Rejected'}
                </div>
              </div>
            );
          })}
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
