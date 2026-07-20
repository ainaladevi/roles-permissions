import React from 'react';
import { Shield } from 'lucide-react';
import './RolesList.css';

const RolesList = ({ roles, selectedRole, onSelectRole }) => {
  return (
    <div className="roles-list-container d-flex gap-3 flex-nowrap pb-3 pt-2 px-1">
      {roles.map((role, index) => {
        const isSelected = selectedRole?.name === role.name;
        
        return (
          <div 
            key={index}
            className={`roles-list-card card flex-shrink-0 cursor-pointer transition-all ${isSelected ? 'active' : ''}`}
            onClick={() => onSelectRole(role)}
          >
            <div 
              className="roles-list-pill d-inline-flex align-items-center mb-3 px-3 py-1 rounded-pill align-self-start"
              style={{ 
                backgroundColor: `color-mix(in srgb, ${role.color} 15%, transparent)`, 
                color: role.color 
              }}
            >
              <Shield size={16} className="me-2" />
              <span className="fw-bold" style={{ fontSize: '13px' }}>{role.name}</span>
            </div>
            
            <p className="roles-list-desc mb-3 flex-grow-1" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              {role.desc}
            </p>
            
            <div className="roles-list-users" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              <span>{role.users} {role.users === 1 ? 'admin' : 'admins'} assigned</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RolesList;
