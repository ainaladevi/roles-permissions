import React, { useState } from 'react';
import { Check, UserPlus } from 'lucide-react';
import './PermissionMatrix.css';

const PermissionMatrix = ({ roles, showToast, onAddAdmin }) => {
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

  const [permissions, setPermissions] = useState(() => {
    const initial = {};
    permissionCategories.forEach(cat => {
      cat.keys.forEach(key => {
        initial[key] = {};
        roles.forEach(r => {
          initial[key][r.role_id] = r.permissions?.includes(key) || false;
        });
      });
    });
    return initial;
  });

  const handleToggle = (key, roleId) => {
    setPermissions(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [roleId]: !prev[key][roleId]
      }
    }));
    
    showToast(`Permission updated for role`);
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
          Assign Role
        </button>
      </div>

      <div className="table-responsive px-4 pb-4">
        <table className="table table-borderless permission-matrix-table mb-0">
          <thead>
            <tr>
              <th className="fw-bold pb-3 ps-2" style={{ color: 'var(--color-text-muted)' }}>PERMISSION KEY</th>
              {roles.map((role, idx) => (
                <th key={idx} className="text-center fw-bold pb-3 text-uppercase" style={{ color: 'var(--color-text-muted)' }}>
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissionCategories.map((cat, catIdx) => (
              <React.Fragment key={catIdx}>
                <tr>
                  <td colSpan={roles.length + 1} className="py-2 pt-4 ps-2 fw-bold" style={{ color: 'var(--color-text-muted)', fontSize: '12px', letterSpacing: '0.5px' }}>
                    {cat.name.toUpperCase()}
                  </td>
                </tr>
                {cat.keys.map((key, kIdx) => (
                  <tr key={`${catIdx}-${kIdx}`}>
                    <td className="py-3 ps-4" style={{ fontSize: '14px', borderBottom: '1px solid var(--color-surface-offset)' }}>{key}</td>
                    {roles.map((role, rIdx) => {
                      const checked = permissions[key][role.role_id];
                      return (
                        <td key={rIdx} className="text-center py-3" style={{ borderBottom: '1px solid var(--color-surface-offset)' }}>
                          <div 
                            className={`matrix-checkbox cursor-pointer ${checked ? 'checked' : ''}`}
                            onClick={() => handleToggle(key, role.role_id)}
                          >
                            {checked && <Check size={14} strokeWidth={3.5} />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionMatrix;
