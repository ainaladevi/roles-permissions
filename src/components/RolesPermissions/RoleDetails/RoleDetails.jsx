import React from 'react';
import { Edit2, Trash2, Users, Shield } from 'lucide-react';
import './RoleDetails.css';

const RoleDetails = ({ role, onEditRole }) => {
  if (!role) return null;

  return (
    <div className="role-details-container card">
      <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
        <div className="d-flex align-items-center">
          <div 
            className="role-details-icon d-flex align-items-center justify-content-center rounded-circle me-3 flex-shrink-0"
            style={{ backgroundColor: `color-mix(in srgb, ${role.color} 15%, transparent)`, color: role.color }}
          >
            <Shield size={24} />
          </div>
          <div>
            <h4 className="fw-bold mb-1 d-flex align-items-center flex-wrap gap-2">
              {role.name}
              <span className="badge bg-light text-dark border d-flex align-items-center fw-normal" style={{ fontSize: '0.8rem' }}>
                <Users size={12} className="me-1" />
                {role.users} Assigned
              </span>
            </h4>
            <div className="text-muted small">Role ID: {role.name.toLowerCase().replace(/\s+/g, '-')}</div>
          </div>
        </div>
        
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-secondary btn-sm d-flex align-items-center px-3 border"
            onClick={onEditRole}
          >
            <Edit2 size={14} className="me-2" />
            Edit Role
          </button>
          <button className="btn btn-outline-danger btn-sm d-flex align-items-center px-3 border-danger text-danger">
            <Trash2 size={14} className="me-2" />
            Delete
          </button>
        </div>
      </div>
      
      <div>
        <h6 className="fw-bold mb-2">Description</h6>
        <p className="text-muted mb-0">{role.desc}</p>
      </div>
    </div>
  );
};

export default RoleDetails;
