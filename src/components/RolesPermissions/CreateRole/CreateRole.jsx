import React from 'react';
import { X } from 'lucide-react';
import './CreateRole.css';

const CreateRole = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="create-role-overlay">
      <div className="create-role-modal card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Create New Role</h5>
          <button className="icon-btn" onClick={onClose} type="button" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        
        <form>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Role Name</label>
            <input type="text" className="form-control" placeholder="e.g., Content Moderator" />
          </div>
          
          <div className="mb-4">
            <label className="form-label small fw-bold text-muted">Description</label>
            <textarea className="form-control" rows="3" placeholder="Describe the role's responsibilities..."></textarea>
          </div>
          
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary px-4" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary px-4" style={{ backgroundColor: 'var(--color-primary)', border: 'none' }}>Create Role</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRole;
