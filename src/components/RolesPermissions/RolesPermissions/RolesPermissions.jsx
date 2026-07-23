import React, { useState } from 'react';
import './RolesPermissions.css';
import RolesHeader from '../RolesHeader/RolesHeader';
import RolesList from '../RolesList/RolesList';
import PermissionMatrix from '../PermissionMatrix/PermissionMatrix';
import RoleDetailView from '../RoleDetailView/RoleDetailView';
import CreateRole from '../CreateRole/CreateRole';
import EditRole from '../EditRole/EditRole';
import UsersManagement from '../UsersManagement/UsersManagement';
import { rolesData, initialUsersData } from '../../../data/rolesPermissionsData';
import { CheckCircle, X } from 'lucide-react';


const RolesPermissions = () => {
  const [activeModuleTab, setActiveModuleTab] = useState('roles');
  const [roles, setRoles] = useState(rolesData);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [viewMode, setViewMode] = useState('list');
  const [toasts, setToasts] = useState([]);
  const [isAssignRoleModalOpen, setIsAssignRoleModalOpen] = useState(false);
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  
  const [isViewRoleDrawerOpen, setIsViewRoleDrawerOpen] = useState(false);
  const [roleToView, setRoleToView] = useState(null);
  
  const [currentUserRole, setCurrentUserRole] = useState('Analyst');
  const canEditRoles = currentUserRole === 'Super Admin';

  const [pendingUsersCount, setPendingUsersCount] = useState(() => initialUsersData.filter(u => u.applicationStatus === 'Pending').length);

  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleRemoveAdmin = (adminToRemove) => {
    const updatedRole = {
      ...selectedRole,
      admins: selectedRole.admins.filter(a => a.name !== adminToRemove.name),
      users: selectedRole.users - 1
    };
    setSelectedRole(updatedRole);
    setRoles(prev => prev.map(r => r.role_id === updatedRole.role_id ? updatedRole : r));
    showToast(`User ${adminToRemove.name} removed from role`);
  };

  const handleEditAdmin = (adminToEdit) => {
    setIsAssignRoleModalOpen(true);
    showToast(`Editing roles for ${adminToEdit.name}`);
  };

  const filteredRoles = roles.filter(r => {
    const query = globalSearchQuery.toLowerCase();
    const matchName = r.name.toLowerCase().includes(query);
    const matchDesc = r.desc && r.desc.toLowerCase().includes(query);
    const matchAdmin = r.admins && r.admins.some(admin => admin.name.toLowerCase().includes(query));
    return matchName || matchDesc || matchAdmin;
  });

  return (
    <div className="roles-permissions-page d-flex flex-column h-100 position-relative">
      <RolesHeader 
        viewMode={viewMode} 
        selectedRole={selectedRole} 
        onBack={() => setViewMode('list')} 
        canEditRoles={canEditRoles}
        currentUserRole={currentUserRole}
        setCurrentUserRole={setCurrentUserRole}
        onCreateRole={() => setIsCreateRoleModalOpen(true)}
        searchQuery={globalSearchQuery}
        onSearchChange={setGlobalSearchQuery}
      />

      <div className="flex-grow-1 p-4 overflow-auto">
        
        <div className="content-container mx-auto mb-4" style={{ maxWidth: '1200px' }}>
          <div className="d-flex border-bottom">
            <button 
              className={`btn btn-link text-decoration-none px-4 py-3 fw-bold ${activeModuleTab === 'roles' ? 'border-bottom border-primary text-primary border-3' : 'text-muted'}`}
              onClick={() => setActiveModuleTab('roles')}
              style={{ borderRadius: 0, fontSize: '15px' }}
            >
              Roles & Permissions
            </button>
            <button 
              className={`btn btn-link text-decoration-none px-4 py-3 fw-bold ${activeModuleTab === 'users' ? 'border-bottom border-primary text-primary border-3' : 'text-muted'}`}
              onClick={() => setActiveModuleTab('users')}
              style={{ borderRadius: 0, fontSize: '15px' }}
            >
              User Management
              {pendingUsersCount > 0 && <span className="badge bg-danger ms-2 rounded-pill">{pendingUsersCount}</span>}
            </button>
          </div>
        </div>

        {activeModuleTab === 'roles' ? (
          <div className="content-container mx-auto" style={{ maxWidth: '1200px' }}>
            {viewMode === 'list' ? (
              <>
                <RolesList 
                  roles={filteredRoles} 
                  selectedRole={selectedRole} 
                  onSelectRole={(role) => {
                    setSelectedRole(role);
                    setViewMode('detail');
                  }} 
                  onViewRole={(role) => {
                    setRoleToView(role);
                    setIsViewRoleDrawerOpen(true);
                  }}
                  canEditRoles={canEditRoles}
                  onCreateRole={() => setIsCreateRoleModalOpen(true)}
                  onEditRole={(role) => {
                    setEditingRole(role);
                    setIsEditRoleModalOpen(true);
                  }}
                />
                <PermissionMatrix 
                  roles={filteredRoles} 
                  showToast={showToast}
                  onAddAdmin={() => setIsAssignRoleModalOpen(true)}
                  canEditRoles={canEditRoles}
                />
              </>
            ) : (
              <RoleDetailView 
                role={selectedRole} 
                showToast={showToast} 
                canEditRoles={canEditRoles} 
                onRemoveAdmin={handleRemoveAdmin}
                onEditAdmin={handleEditAdmin}
              />
            )}
          </div>
        ) : (
          <UsersManagement onPendingCountChange={setPendingUsersCount} canEditRoles={canEditRoles} />
        )}
      </div>

      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className="toast-notification d-flex align-items-center"
            style={{
              backgroundColor: 'var(--color-text)',
              color: 'var(--color-text-inverse)',
              padding: '14px 20px',
              borderRadius: 'var(--radius-md)',
              animation: 'toastin 0.3s ease',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <CheckCircle size={18} strokeWidth={2} style={{ color: 'var(--color-success)', marginRight: '10px' }} />
            <span className="fw-medium" style={{ fontSize: '14px' }}>{toast.message}</span>
          </div>
        ))}
      </div>

      {isAssignRoleModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(2px)' }}>
          <div className="card modal-card" style={{ width: '100%', maxWidth: '550px', padding: '24px', animation: 'fadein 0.2s ease-out' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Assign Role</h5>
              <button className="icon-btn" onClick={() => setIsAssignRoleModalOpen(false)} type="button" aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="border-bottom mb-4"></div>
            
            <form style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}>
              
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">Select User</label>
                <select className="form-select" defaultValue="">
                  <option value="" disabled>Choose a user...</option>
                  <option value="user1">Alex Chen (Analyst)</option>
                  <option value="user2">Priya Desai (Support Agent)</option>
                  <option value="user3">Sam Torres (Moderator)</option>
                  <option value="user4">Nadia Khan (Moderator)</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted mb-2">Assign Roles (Multiple allowed)</label>
                <div className="border rounded p-3" style={{ borderColor: 'var(--color-border)' }}>
                  {roles.map(r => (
                    <div className="form-check mb-2 last-mb-none" key={r.role_id}>
                      <input className="form-check-input" type="checkbox" id={`assign-${r.role_id}`} />
                      <label className="form-check-label" htmlFor={`assign-${r.role_id}`} style={{ fontSize: '13px' }}>
                        {r.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">Audit Event Information / Reason</label>
                <textarea className="form-control" rows="2" placeholder="Required for compliance..."></textarea>
              </div>
              
              <div className="d-flex justify-content-end gap-2 pt-3 border-top mt-2">
                <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setIsAssignRoleModalOpen(false)}>Cancel</button>
                <button type="button" className="btn btn-primary px-4" style={{ backgroundColor: 'var(--color-primary)', border: 'none' }} onClick={() => {
                  showToast('Role assignments updated successfully');
                  setIsAssignRoleModalOpen(false);
                }}>Assign</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <CreateRole 
        isOpen={isCreateRoleModalOpen} 
        onClose={() => setIsCreateRoleModalOpen(false)} 
        showToast={showToast}
        onCreateRoleSubmit={(newRole) => {
          setRoles(prev => [...prev, newRole]);
        }}
      />

      <EditRole 
        isOpen={isEditRoleModalOpen} 
        role={editingRole}
        onClose={() => {
          setIsEditRoleModalOpen(false);
          setEditingRole(null);
        }} 
        showToast={showToast}
      />


      {isViewRoleDrawerOpen && roleToView && (
        <>
          <div className="drawer-backdrop" onClick={() => setIsViewRoleDrawerOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040, animation: 'fadein 0.2s ease-out' }}></div>
          <div className="card modal-card shadow-lg" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px', zIndex: 1050, overflowY: 'auto', borderRadius: '0', animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom sticky-top" style={{ backgroundColor: 'var(--color-bg)' }}>
              <h5 className="fw-bold mb-0">Role Details</h5>
              <button className="icon-btn" onClick={() => setIsViewRoleDrawerOpen(false)} type="button">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <h3 className="fw-bold mb-2">{roleToView.name}</h3>
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">Active Role</span>
              </div>
              
              <div className="mb-4">
                <label className="text-muted small fw-bold text-uppercase mb-2">Description</label>
                <p className="mb-0" style={{ fontSize: '14px' }}>{roleToView.desc || "No description available for this role."}</p>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="p-3 bg-light rounded border">
                    <div className="text-muted small fw-bold text-uppercase mb-1">Users</div>
                    <div className="fs-4 fw-bold">{roleToView.users}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light rounded border">
                    <div className="text-muted small fw-bold text-uppercase mb-1">Permissions</div>
                    <div className="fs-4 fw-bold">{roleToView.permissions?.length || 0}</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-muted small fw-bold text-uppercase mb-3">Assigned Users (Sample)</label>
                <div className="d-flex flex-column gap-2">
                  {roleToView.admins?.map((admin, idx) => (
                    <div key={idx} className="d-flex align-items-center gap-3 p-2 border rounded bg-white">
                      <div className="avatar-circle shadow-sm" style={{ backgroundColor: 'var(--color-primary)', color: 'white', width: '32px', height: '32px', fontSize: '12px' }}>
                        {admin.initials}
                      </div>
                      <div className="fw-medium" style={{ fontSize: '14px' }}>{admin.name}</div>
                    </div>
                  ))}
                  {(!roleToView.admins || roleToView.admins.length === 0) && (
                    <div className="text-muted small">No users assigned.</div>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="text-muted small fw-bold text-uppercase mb-3">Permission Groups</label>
                <div className="d-flex flex-wrap gap-2">
                  {['Moderation', 'Tickets', 'Audit', 'Settings'].map((group, idx) => (
                    <span key={idx} className="badge bg-secondary-subtle text-secondary border px-2 py-1">{group}</span>
                  ))}
                </div>
              </div>

              <div className="mb-4 border-top pt-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small fw-bold">Created By</span>
                  <span className="small fw-medium">Super Admin</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small fw-bold">Created Date</span>
                  <span className="small fw-medium">Jan 15, 2024</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted small fw-bold">Last Updated</span>
                  <span className="small fw-medium">Today</span>
                </div>
              </div>

            </div>
            
            <div className="p-4 border-top mt-auto sticky-bottom" style={{ backgroundColor: 'var(--color-bg)' }}>
              <button 
                className="btn btn-outline-primary w-100"
                onClick={() => {
                  setIsViewRoleDrawerOpen(false);
                  onEditRole(roleToView);
                }}
              >
                Edit This Role
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RolesPermissions;
