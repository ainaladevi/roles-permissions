import React from 'react';
import { Search, Bell, HelpCircle, ArrowLeft } from 'lucide-react';
import './RolesHeader.css';

const RolesHeader = ({ viewMode = 'list', selectedRole, onBack }) => {
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
      </div>
      
      <div className="topbar-actions ms-auto d-flex align-items-center gap-3">
        <div className="search-box">
          <Search />
          <input 
            type="text" 
            placeholder="Search users, posts, reports..." 
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
