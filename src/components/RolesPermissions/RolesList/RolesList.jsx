import React from 'react';
import { Shield, Users, Key, Layers } from 'lucide-react';
import './RolesList.css';

const RolesList = ({ roles, selectedRole, onSelectRole, onViewRole, canEditRoles, onCreateRole, onEditRole }) => {
  const getAvatarColor = (initials) => {
    const colors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'];
    const charCode = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
    return colors[charCode % colors.length];
  };

  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h5 className="fw-bold mb-1" style={{ color: 'var(--color-text)' }}>Role List</h5>
          <p className="text-muted mb-0" style={{ fontSize: '14px', maxWidth: '800px' }}>
            A role provides access to predefined menus and features so that depending on assigned role an administrator can have access to what user needs.
          </p>
        </div>
        {canEditRoles && (
          <button 
            className="btn btn-primary d-flex align-items-center justify-content-center shadow-sm"
            style={{ 
              backgroundColor: 'var(--color-primary)', 
              border: 'none', 
              borderRadius: 'var(--radius-sm)', 
              fontWeight: 600, 
              fontSize: '14px', 
              padding: '10px 20px',
              whiteSpace: 'nowrap'
            }}
            onClick={onCreateRole}
          >
            + Add New Role
          </button>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 d-flex flex-row align-items-center justify-content-between" style={{ padding: '24px', border: '1px solid var(--color-border) !important' }}>
            <div>
              <div className="text-muted small fw-bold mb-2 text-uppercase letter-spacing-1">Total Roles</div>
              <div className="fs-2 fw-bold" style={{ color: 'var(--color-primary)' }}>{roles.length}</div>
            </div>
            <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--color-primary-highlight)', color: 'var(--color-primary)' }}>
              <Shield size={28} strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 d-flex flex-row align-items-center justify-content-between" style={{ padding: '24px', border: '1px solid var(--color-border) !important' }}>
            <div>
              <div className="text-muted small fw-bold mb-2 text-uppercase letter-spacing-1">Admin Users</div>
              <div className="fs-2 fw-bold" style={{ color: 'var(--color-success)' }}>
                {roles.reduce((acc, role) => acc + (role.users || 0), 0)}
              </div>
            </div>
            <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--color-success-highlight)', color: 'var(--color-success)' }}>
              <Users size={28} strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 d-flex flex-row align-items-center justify-content-between" style={{ padding: '24px', border: '1px solid var(--color-border) !important' }}>
            <div>
              <div className="text-muted small fw-bold mb-2 text-uppercase letter-spacing-1">Custom Roles</div>
              <div className="fs-2 fw-bold" style={{ color: 'var(--color-warning)' }}>2</div>
            </div>
            <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--color-warning-highlight)', color: 'var(--color-warning)' }}>
              <Key size={28} strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 d-flex flex-row align-items-center justify-content-between" style={{ padding: '24px', border: '1px solid var(--color-border) !important' }}>
            <div>
              <div className="text-muted small fw-bold mb-2 text-uppercase letter-spacing-1">Perm Groups</div>
              <div className="fs-2 fw-bold" style={{ color: 'var(--color-text-muted)' }}>4</div>
            </div>
            <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--color-surface-offset)', color: 'var(--color-text-muted)' }}>
              <Layers size={28} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>

      <div className="roles-list-container">
      {roles.map((role, index) => {
        const isSelected = selectedRole?.name === role.name;
        const displayAdmins = role.admins?.slice(0, 5) || [];
        const extraAdmins = Math.max(0, (role.admins?.length || 0) - 5);
        
        return (
          <div 
            key={index}
            className={`roles-list-card d-flex flex-column ${isSelected ? 'active' : ''}`}
            onClick={() => onSelectRole(role)}
            style={{ minHeight: '220px' }}
          >
            <div className="card-top-row">
              <span className="total-users">Total {role.users} {role.users === 1 ? 'user' : 'users'}</span>
              
              <div className="avatar-stack">
                {displayAdmins.map((admin, idx) => (
                  <div 
                    key={idx} 
                    className="avatar-circle" 
                    style={{ backgroundColor: getAvatarColor(admin.initials), zIndex: 5 - idx }}
                    title={admin.name}
                  >
                    {admin.initials}
                  </div>
                ))}
                {extraAdmins > 0 && (
                  <div className="avatar-circle" style={{ backgroundColor: '#e2e8f0', color: '#475569', zIndex: 0 }}>
                    +{extraAdmins}
                  </div>
                )}
              </div>
            </div>
            
            <div className="role-title">
              {role.name}
            </div>
            
            <p className="text-muted mt-2 mb-3" style={{ fontSize: '13px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {role.desc || "No description provided for this role."}
            </p>
            
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="badge bg-light text-body border fw-medium"><span className="text-muted fw-normal me-1">Permissions:</span>{role.permissions?.length || 0}</span>
              <span className="badge bg-light text-body border fw-medium"><span className="text-muted fw-normal me-1">Updated:</span>Today</span>
            </div>
            
            <div className="card-bottom-row d-flex justify-content-between align-items-center border-top pt-3 mt-auto">
              {canEditRoles && role.role_id !== 'super_admin' ? (
                <span 
                  className="edit-role-link text-primary fw-medium"
                  style={{ cursor: 'pointer', fontSize: '14px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditRole(role);
                  }}
                >
                  Edit Role
                </span>
              ) : (
                <span className="edit-role-link text-muted fw-medium" style={{ fontSize: '14px' }}>
                  {role.role_id === 'super_admin' ? 'System Role' : ''}
                </span>
              )}
              
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewRole(role);
                }}
              >
                View Role
              </button>
            </div>
          </div>
        );
      })}

    </div>
    </>
  );
};

export default RolesList;
