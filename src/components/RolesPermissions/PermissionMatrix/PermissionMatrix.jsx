import React, { useState } from 'react';
import { Check, UserPlus } from 'lucide-react';
import './PermissionMatrix.css';

const PermissionMatrix = ({ roles, showToast, onAddAdmin }) => {
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

  const [permissions, setPermissions] = useState(() => {
    const initial = {};
    modules.forEach(m => {
      initial[m] = {};
      roles.forEach(r => {
        initial[m][r.name] = getInitialCheck(m, r.name);
      });
    });
    return initial;
  });

  const handleToggle = (moduleName, roleName) => {
    setPermissions(prev => ({
      ...prev,
      [moduleName]: {
        ...prev[moduleName],
        [roleName]: !prev[moduleName][roleName]
      }
    }));
    
    showToast(`Permission updated for ${roleName}`);
  };

  return (
    <div className="permission-matrix-container card border p-0 mt-3">
      <div className="d-flex justify-content-between align-items-center p-4">
        <h5 className="fw-bold mb-0">Permission matrix</h5>
        <button 
          className="btn btn-primary d-flex align-items-center text-white px-3 py-2"
          style={{ backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '14px' }}
          onClick={onAddAdmin}
        >
          <UserPlus size={16} className="me-2" />
          Add admin
        </button>
      </div>

      <div className="table-responsive px-4 pb-4">
        <table className="table table-borderless permission-matrix-table mb-0">
          <thead>
            <tr>
              <th className="fw-bold pb-3 ps-2" style={{ color: 'var(--color-text-muted)' }}>MODULE</th>
              {roles.map((role, idx) => (
                <th key={idx} className="text-center fw-bold pb-3 text-uppercase" style={{ color: 'var(--color-text-muted)' }}>
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map((moduleName, idx) => (
              <tr key={idx}>
                <td className="py-3 ps-2" style={{ fontSize: '14px' }}>{moduleName}</td>
                {roles.map((role, rIdx) => {
                  const checked = permissions[moduleName][role.name];
                  return (
                    <td key={rIdx} className="text-center py-3">
                      <div 
                        className={`matrix-checkbox cursor-pointer ${checked ? 'checked' : ''}`}
                        onClick={() => handleToggle(moduleName, role.name)}
                      >
                        {checked && <Check size={14} strokeWidth={3.5} />}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionMatrix;
