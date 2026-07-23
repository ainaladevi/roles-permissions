import React, { useState } from 'react';
import { permissionCategories } from '../../../data/rolesPermissionsData';
import { X } from 'lucide-react';
import './CreateRole.css';

const CreateRole = ({ isOpen, onClose, showToast, onCreateRoleSubmit }) => {
  const [roleName, setRoleName] = useState('');
  const [roleDesc, setRoleDesc] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  if (!isOpen) return null;

  const handlePermissionChange = (key) => {
    setSelectedPermissions(prev => 
      prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
    );
  };


  return (
    <div className="create-role-overlay">
      <div className="create-role-modal card modal-card" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Create New Role</h5>
          <button className="icon-btn" onClick={onClose} type="button" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        
        <form>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Role Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g., Content Moderator" 
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label small fw-bold text-muted">Description</label>
            <textarea 
              className="form-control" 
              rows="3" 
              placeholder="Describe the role's responsibilities..."
              value={roleDesc}
              onChange={(e) => setRoleDesc(e.target.value)}
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="form-label small fw-bold text-muted mb-3">Permissions</label>
            <div className="border rounded p-3" style={{ borderColor: 'var(--color-border)' }}>
              {permissionCategories.map((cat, catIdx) => (
                <div key={catIdx} className="mb-3 last-mb-none">
                  <h6 className="fw-bold mb-2" style={{ fontSize: '13px' }}>{cat.name}</h6>
                  <div className="d-flex flex-wrap gap-3">
                    {cat.keys.map((keyObj, kIdx) => {
                      const key = keyObj.id;
                      return (
                      <div className="form-check" key={kIdx}>
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id={`create-${key}`} 
                          checked={selectedPermissions.includes(key)}
                          onChange={() => handlePermissionChange(key)}
                        />
                        <label className="form-check-label" htmlFor={`create-${key}`} style={{ fontSize: '13px' }}>
                          {keyObj.label}
                        </label>
                      </div>
                    )})}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="d-flex justify-content-end gap-2 pt-2">
            <button type="button" className="btn btn-outline-secondary px-4" onClick={onClose}>Cancel</button>
            <button 
              type="button" 
              className="btn btn-primary px-4" 
              style={{ backgroundColor: 'var(--color-primary)', border: 'none' }}
              onClick={() => {
                if (!roleName.trim()) {
                  if (showToast) showToast('Role Name is required');
                  return;
                }
                const newRole = {
                  role_id: roleName.toLowerCase().replace(/\s+/g, '_'),
                  name: roleName,
                  desc: roleDesc,
                  permissions: selectedPermissions,
                  users: 0,
                  admins: [],
                  color: '#8b5cf6'
                };
                if (onCreateRoleSubmit) onCreateRoleSubmit(newRole);
                if (showToast) showToast('Role created successfully!');
                

                setRoleName('');
                setRoleDesc('');
                setSelectedPermissions([]);
                onClose();
              }}
            >
              Create Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRole;
