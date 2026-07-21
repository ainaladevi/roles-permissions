import React from 'react';
import { Search, Bell, HelpCircle, ArrowLeft } from 'lucide-react';
import './RolesHeader.css';

const RolesHeader = ({ viewMode = 'list', selectedRole, onBack, canEditRoles, currentUserRole, setCurrentUserRole, onCreateRole }) => {
  return (
    <div className="roles-header topbar border-bottom">
      <div className="page-title d-flex align-items-center gap-3">
        {viewMode === 'detail' && (
          <button 
            className="icon-btn border-0 bg-transparent" 
            onClick={onBack} 
            aria-label="Back to roles list"
            style={{ width: '32px', height: '32px' }}
          >
            <ArrowLeft size={20} />
          </button>
        )}
        {viewMode === 'detail' && selectedRole ? `${selectedRole.name} — Role Detail` : 'Roles & Permissions'}
        
        {!canEditRoles && (
          <span className="badge bg-danger bg-opacity-10 text-danger border border-danger ms-3 d-flex align-items-center fw-normal" style={{ fontSize: '12px' }}>
            🔒 Read-Only (Restricted Access)
          </span>
        )}
      </div>
      
      <div className="topbar-actions ms-auto d-flex align-items-center gap-3">
        <div className="d-flex align-items-center me-3 border-end pe-3" style={{ fontSize: '13px' }}>
          <span className="text-muted fw-bold me-2">Simulate User:</span>
          <select 
            className="form-select form-select-sm w-auto shadow-sm" 
            value={currentUserRole} 
            onChange={(e) => setCurrentUserRole(e.target.value)}
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-divider)' }}
          >
            <option value="Super Admin">Super Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="Support Agent">Support Agent</option>
            <option value="Analyst">Analyst</option>
          </select>
        </div>

        <div className="search-box">
          <Search />
          <input 
            type="text" 
            placeholder="Search users, posts, reports..." 
            className="form-control"
            style={{ paddingLeft: '32px' }}
          />
        </div>
        
        <button className="icon-btn border-0 bg-transparent" aria-label="Notifications">
          <Bell size={20} />
        </button>
        <button className="icon-btn border-0 bg-transparent" aria-label="Help">
          <HelpCircle size={20} />
        </button>
      </div>
    </div>
  );
};

export default RolesHeader;
