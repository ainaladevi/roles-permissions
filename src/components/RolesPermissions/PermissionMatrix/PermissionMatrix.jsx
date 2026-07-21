import React, { useState } from 'react';
import { Check, X, UserPlus, Eye, Settings, Download, MessageSquare, ShieldCheck, Plug, Key, Layers, Users } from 'lucide-react';
import './PermissionMatrix.css';

const PermissionMatrix = ({ roles, showToast, onAddAdmin, canEditRoles }) => {
  const permissionCategories = [
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
        { id: 'settings.security_edit', label: 'Security', icon: ShieldCheck }
      ]
    }
  ];

  const [permissions, setPermissions] = useState(() => {
    const initial = {};
    permissionCategories.forEach(cat => {
      cat.keys.forEach(keyObj => {
        const key = keyObj.id;
        initial[key] = {};
        roles.forEach(r => {
          initial[key][r.name] = r.permissions?.includes(key) || false;
        });
      });
    });
    return initial;
  });

  const handleToggle = (key, roleName) => {
    if (!canEditRoles) {
      showToast('You do not have permission to edit roles.');
      return;
    }
    setPermissions(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [roleName]: !prev[key][roleName]
      }
    }));
    
    showToast(`Permission updated for ${roleName}`);
  };

  const totalPermissions = permissionCategories.reduce((acc, cat) => acc + cat.keys.length, 0);
  const totalModules = permissionCategories.length;
  const totalRoles = roles.length;

  return (
    <div className="permission-matrix-container card border p-0 mt-3">
      <div className="d-flex justify-content-between align-items-center p-4">
        <h5 className="fw-bold mb-0">Permission matrix</h5>
        {canEditRoles && (
          <button 
            className="btn btn-primary d-flex align-items-center text-white px-3 py-2"
            style={{ backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '14px' }}
            onClick={onAddAdmin}
          >
            <UserPlus size={16} className="me-2" />
            Assign Role
          </button>
        )}
      </div>

      {/* Inline Statistics */}
      <div className="d-flex align-items-center gap-4 px-4 pb-3 mb-3 border-bottom text-muted" style={{ fontSize: '14px' }}>
        <div className="d-flex align-items-center gap-2">
          <Key size={16} className="text-primary" />
          <span className="fw-medium text-body"><span className="fw-bold fs-6">{totalPermissions}</span> Total Permissions</span>
        </div>
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-divider)' }}></div>
        <div className="d-flex align-items-center gap-2">
          <Layers size={16} className="text-success" />
          <span className="fw-medium text-body"><span className="fw-bold fs-6">{totalModules}</span> Modules</span>
        </div>
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-divider)' }}></div>
        <div className="d-flex align-items-center gap-2">
          <Users size={16} className="text-warning" />
          <span className="fw-medium text-body"><span className="fw-bold fs-6">{totalRoles}</span> Roles</span>
        </div>
      </div>

      <div className="table-responsive px-4 pb-4" style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <table className="table table-borderless permission-matrix-table mb-0">
          <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'var(--color-surface)' }}>
            <tr>
              <th className="fw-bold pb-3 ps-2" style={{ color: 'var(--color-text-muted)', backgroundColor: 'var(--color-surface)' }}>Permission</th>
              {roles.map((role, idx) => (
                <th key={idx} className="fw-bold pb-3 text-uppercase" style={{ color: 'var(--color-text-muted)', textAlign: 'center', backgroundColor: 'var(--color-surface)' }}>
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissionCategories.map((cat, catIdx) => (
              <React.Fragment key={catIdx}>
                <tr>
                  <td colSpan={roles.length + 1} className="py-2 px-2 fw-bold" style={{ backgroundColor: 'var(--color-surface-offset)', fontSize: '12px', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>
                    {cat.name.toUpperCase()}
                  </td>
                </tr>
                {cat.keys.map((keyObj, kIdx) => {
                  const key = keyObj.id;
                  const Icon = keyObj.icon;
                  return (
                    <tr key={`${catIdx}-${kIdx}`} className="matrix-row">
                      <td className="py-3 ps-3" style={{ fontSize: '13px', borderLeft: '3px solid transparent' }}>
                        <div className="d-flex align-items-center gap-2 text-muted fw-medium">
                          <Icon size={16} />
                          <span>{keyObj.label}</span>
                        </div>
                      </td>
                      {roles.map((role, rIdx) => {
                        const checked = permissions[key][role.name];
                        return (
                          <td 
                            key={rIdx} 
                            className={`py-2 ${canEditRoles && role.role_id !== 'super_admin' ? 'cursor-pointer' : ''}`}
                            style={{ textAlign: 'center', verticalAlign: 'middle' }}
                            onClick={() => {
                              if (canEditRoles && role.role_id !== 'super_admin') handleToggle(key, role.name);
                            }}
                          >
                            <div className="d-flex justify-content-center w-100">
                              <div className={`permission-badge ${checked ? 'granted' : 'denied'} ${(!canEditRoles || role.role_id === 'super_admin') ? 'opacity-50' : ''}`} style={role.role_id === 'super_admin' ? { cursor: 'not-allowed' } : {}}>
                                {checked ? <Check size={14} strokeWidth={3.5} /> : <X size={14} strokeWidth={3.5} />}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionMatrix;
