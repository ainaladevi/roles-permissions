import React from 'react';
import { X } from 'lucide-react';
import './EditRole.css';

const EditRole = ({ isOpen, onClose, role }) => {
  if (!isOpen || !role) return null;

  return (
    <div className="edit-role-overlay">
      <div className="edit-role-modal card">
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
          
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary px-4" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary px-4" style={{ backgroundColor: 'var(--color-primary)', border: 'none' }}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRole;
