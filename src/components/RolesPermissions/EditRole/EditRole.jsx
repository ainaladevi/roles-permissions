import React from 'react';
import { X } from 'lucide-react';
import './EditRole.css';

const EditRole = ({ isOpen, onClose, role }) => {
  if (!isOpen || !role) return null;

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
    <div className="edit-role-overlay">
      <div className="edit-role-modal card" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Edit Role</h5>
          <button className="icon-btn" onClick={onClose} type="button" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        
        <form>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Role Name</label>
            <input type="text" className="form-control" defaultValue={role.name} />
          </div>
          
          <div className="mb-4">
            <label className="form-label small fw-bold text-muted">Description</label>
            <textarea className="form-control" rows="3" defaultValue={role.desc}></textarea>
          </div>
          
          <div className="mb-4">
            <label className="form-label small fw-bold text-muted mb-3">Permissions</label>
            <div className="border rounded p-3" style={{ borderColor: 'var(--color-border)' }}>
              {permissionCategories.map((cat, catIdx) => (
                <div key={catIdx} className="mb-3 last-mb-none">
                  <h6 className="fw-bold mb-2" style={{ fontSize: '13px' }}>{cat.name}</h6>
                  <div className="d-flex flex-wrap gap-3">
                    {cat.keys.map((key, kIdx) => {
                      const isChecked = role.permissions?.includes(key);
                      return (
                        <div className="form-check" key={kIdx}>
                          <input className="form-check-input" type="checkbox" id={`edit-${key}`} defaultChecked={isChecked} />
                          <label className="form-check-label" htmlFor={`edit-${key}`} style={{ fontSize: '13px' }}>
                            {key}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="d-flex justify-content-end gap-2 pt-2">
            <button type="button" className="btn btn-outline-secondary px-4" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary px-4" style={{ backgroundColor: 'var(--color-primary)', border: 'none' }}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRole;
