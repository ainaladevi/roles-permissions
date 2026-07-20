import React, { useState } from 'react';
import RolesHeader from '../RolesHeader/RolesHeader';
import RolesList from '../RolesList/RolesList';
import PermissionMatrix from '../PermissionMatrix/PermissionMatrix';
import RoleDetailView from '../RoleDetailView/RoleDetailView';
import { rolesData } from '../../../data/rolesPermissionsData';
import { CheckCircle } from 'lucide-react';
import './RolesPermissions.css';

const RolesPermissions = () => {
  const [selectedRole, setSelectedRole] = useState(rolesData[0]);
  const [viewMode, setViewMode] = useState('list');
  const [toasts, setToasts] = useState([]);

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
              onAddAdmin={() => showToast('Add admin form opened')}
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
    </div>
  );
};

export default RolesPermissions;
