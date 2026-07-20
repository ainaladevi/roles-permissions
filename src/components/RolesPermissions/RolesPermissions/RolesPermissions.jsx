import React, { useState } from 'react';
import RolesHeader from '../RolesHeader/RolesHeader';
import RolesList from '../RolesList/RolesList';
import PermissionMatrix from '../PermissionMatrix/PermissionMatrix';
import RoleDetailView from '../RoleDetailView/RoleDetailView';
import { rolesData } from '../../../data/rolesPermissionsData';
import { CheckCircle, X } from 'lucide-react';
import './RolesPermissions.css';

const RolesPermissions = () => {
  const [selectedRole, setSelectedRole] = useState(rolesData[0]);
  const [viewMode, setViewMode] = useState('list');
  const [toasts, setToasts] = useState([]);
  const [isAssignRoleModalOpen, setIsAssignRoleModalOpen] = useState(false);

  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  return (
    <div className="roles-permissions-page d-flex flex-column h-100 position-relative">
      <RolesHeader 
        viewMode={viewMode} 
        selectedRole={selectedRole} 
        onBack={() => setViewMode('list')} 
      />
      <div className="flex-grow-1 p-4 overflow-auto">
        {viewMode === 'list' ? (
          <div className="mx-auto" style={{ maxWidth: '1400px' }}>
            <RolesList 
              roles={rolesData} 
              selectedRole={selectedRole} 
              onSelectRole={(role) => {
                setSelectedRole(role);
                setViewMode('detail');
              }} 
            />
            <PermissionMatrix 
              roles={rolesData} 
              showToast={showToast}
              onAddAdmin={() => setIsAssignRoleModalOpen(true)}
            />
          </div>
        ) : (
          <RoleDetailView role={selectedRole} showToast={showToast} />
        )}
      </div>

      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className="toast-notification d-flex align-items-center"
            style={{
              backgroundColor: 'var(--color-text)',
              color: 'var(--color-text-inverse)',
              padding: '14px 20px',
              borderRadius: 'var(--radius-md)',
              animation: 'toastin 0.3s ease',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <CheckCircle size={18} strokeWidth={2} style={{ color: 'var(--color-success)', marginRight: '10px' }} />
            <span className="fw-medium" style={{ fontSize: '14px' }}>{toast.message}</span>
          </div>
        ))}
      </div>

      {isAssignRoleModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(2px)' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '24px', animation: 'fadein 0.2s ease-out' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Assign Roles</h5>
              <button className="icon-btn" onClick={() => setIsAssignRoleModalOpen(false)} type="button" aria-label="Close">
                <X size={20} />
              </button>
            </div>
            
            <form>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Select User</label>
                <select className="form-select" defaultValue="">
                  <option value="" disabled>Choose a user...</option>
                  <option value="user1">Alex Chen (Analyst)</option>
                  <option value="user2">Priya Desai (Support Agent)</option>
                  <option value="user3">Sam Torres (Moderator)</option>
                  <option value="user4">Nadia Khan (Moderator)</option>
                  <option value="user5">New Employee</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted mb-2">Assign Roles (Multiple allowed)</label>
                <div className="border rounded p-3" style={{ borderColor: 'var(--color-border)' }}>
                  {rolesData.map(r => (
                    <div className="form-check mb-2 last-mb-none" key={r.role_id}>
                      <input className="form-check-input" type="checkbox" id={`assign-${r.role_id}`} />
                      <label className="form-check-label" htmlFor={`assign-${r.role_id}`} style={{ fontSize: '13px' }}>
                        {r.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">Audit Event Information / Reason</label>
                <textarea className="form-control" rows="2" placeholder="Required for compliance..."></textarea>
              </div>
              
              <div className="d-flex justify-content-end gap-2 pt-2">
                <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setIsAssignRoleModalOpen(false)}>Cancel</button>
                <button type="button" className="btn btn-primary px-4" style={{ backgroundColor: 'var(--color-primary)', border: 'none' }} onClick={() => {
                  showToast('Role assignments updated successfully');
                  setIsAssignRoleModalOpen(false);
                }}>Assign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPermissions;
