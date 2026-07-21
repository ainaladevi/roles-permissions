import React, { useState, useEffect } from 'react';
import { initialUsersData } from '../../../data/usersData';
import { rolesData } from '../../../data/rolesPermissionsData';
import { CheckCircle, Search, Filter, Eye, ShieldCheck, ShieldAlert, Shield, Clock, FileText, Mail, Phone, MapPin, Calendar, XCircle, X, Bell, ArrowRight, CheckSquare, UserPlus, Download, RefreshCw } from 'lucide-react';
import './UsersManagement.css';

const TABS = ['All Users', 'Pending Approval', 'Active Users', 'Suspended Users', 'Rejected Users'];

const UsersManagement = ({ onPendingCountChange, canEditRoles }) => {
  const [users, setUsers] = useState(initialUsersData);
  const [activeUserTab, setActiveUserTab] = useState('Pending Approval');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All Roles');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const pendingCount = users.filter(u => u.applicationStatus === 'Pending').length;

  useEffect(() => {
    if (onPendingCountChange) {
      onPendingCountChange(pendingCount);
    }
  }, [pendingCount, onPendingCountChange]);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (u.phone && u.phone.includes(searchQuery));
    
    let matchesRole = true;
    if (filterRole !== 'All Roles') {
      if (filterRole === 'Unassigned') {
        matchesRole = !u.role;
      } else {
        matchesRole = u.role === filterRole;
      }
    }
    
    return matchesSearch && matchesRole;
  });

  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleApproveUser = (userId, role) => {
    setUsers(prev => prev.map(u => 
      u.id === userId 
        ? { ...u, applicationStatus: 'Active', role } 
        : u
    ));
    setIsReviewModalOpen(false);
    showToast('User approved and role assigned successfully');
  };

  const handleRejectUser = (userId, reason) => {
    setUsers(prev => prev.map(u => 
      u.id === userId 
        ? { ...u, applicationStatus: 'Rejected', rejectReason: reason, rejectedBy: 'Super Admin' } 
        : u
    ));
    setIsReviewModalOpen(false);
    showToast('User application rejected');
  };

  const handleBulkApprove = () => {
    if (selectedUserIds.length > 0) {
      setUsers(prev => prev.map(u => selectedUserIds.includes(u.id) ? { ...u, applicationStatus: 'Active', role: 'Support Agent' } : u));
      showToast(`Successfully approved ${selectedUserIds.length} selected users.`);
      setSelectedUserIds([]);
    } else {
      const pendingUsers = users.filter(u => u.applicationStatus === 'Pending');
      if (pendingUsers.length === 0) {
        showToast('No pending requests to approve.');
        return;
      }
      setUsers(prev => prev.map(u => u.applicationStatus === 'Pending' ? { ...u, applicationStatus: 'Active', role: 'Support Agent' } : u));
      showToast(`Successfully approved ${pendingUsers.length} users.`);
    }
  };

  const handleBulkAssignRole = () => {
    if (selectedUserIds.length === 0) {
      showToast('Please select users from the table first.');
      return;
    }
    showToast(`Role assignment for ${selectedUserIds.length} users coming soon!`);
  };

  const handleExport = () => {
    showToast('User list exported successfully as CSV.');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('User data refreshed successfully.');
    }, 600);
  };

  return (
    <div className="mx-auto users-management-container">
      {pendingCount > 0 && isBannerVisible && (
        <div className="alert border-0 rounded-4 mb-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between shadow-sm gap-3" style={{ backgroundColor: 'var(--color-primary-highlight)', color: 'var(--color-primary)', padding: '16px 24px' }}>
          <div className="d-flex align-items-center gap-3">
            <div className="rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
              <Bell size={20} />
            </div>
            <div className="fw-medium">
              <span className="fw-bold fs-5 me-1">{pendingCount}</span> New registration requests available.
            </div>
          </div>
          <div className="d-flex align-items-center gap-4 ms-auto ms-md-0">
            <button 
              className="btn btn-sm btn-link text-decoration-none fw-bold d-flex align-items-center gap-1 p-0" 
              style={{ color: 'var(--color-primary)' }}
              onClick={() => setActiveUserTab('Pending Approval')}
            >
              View Pending <ArrowRight size={16} />
            </button>
            <button className="icon-btn p-0" style={{ color: 'var(--color-primary)', opacity: 0.7 }} onClick={() => setIsBannerVisible(false)}>
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <UsersDashboard users={users} />
      
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-3">
        <div className="d-flex border-bottom flex-grow-1 overflow-auto">
          {TABS.map(tab => (
            <button 
              key={tab}
              className={`btn btn-link text-decoration-none px-3 py-2 fw-bold text-nowrap users-tab-btn ${activeUserTab === tab ? 'border-bottom border-primary text-primary border-2' : 'text-muted'}`}
              onClick={() => setActiveUserTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="d-flex gap-2">
          <div className="position-relative">
            <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
            <input 
              type="text" 
              className="form-control form-control-sm ps-4" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="dropdown position-relative">
            <button 
              className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 text-nowrap"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={14} /> {filterRole === 'All Roles' ? 'Filter' : filterRole}
            </button>
            {isFilterOpen && (
              <div className="dropdown-menu show position-absolute end-0 mt-1 shadow-sm filter-dropdown-menu">
                {['All Roles', 'Super Admin', 'Moderator', 'Support Agent', 'Analyst', 'Unassigned'].map(role => (
                  <button 
                    key={role} 
                    className={`dropdown-item ${filterRole === role ? 'active bg-primary text-white' : ''}`}
                    onClick={() => { setFilterRole(role); setIsFilterOpen(false); }}
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Action Toolbar */}
      {canEditRoles && (
        <div className="d-flex flex-wrap gap-2 mb-3">
          <button className="btn btn-sm btn-outline-success d-flex align-items-center gap-1 shadow-sm" onClick={handleBulkApprove}>
            <CheckSquare size={14} /> {selectedUserIds.length > 0 ? `Approve Selected (${selectedUserIds.length})` : 'Approve All'}
          </button>
          <button className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 shadow-sm" onClick={handleBulkAssignRole}>
            <UserPlus size={14} /> Assign Role
          </button>
          <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 shadow-sm" onClick={handleExport}>
            <Download size={14} /> Export
          </button>
          <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 shadow-sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw size={14} className={isRefreshing ? "spin-animation" : ""} /> {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      )}

      <UsersTable 
        users={filteredUsers}
        activeTab={activeUserTab}
        onViewUser={(user) => {
          setSelectedUser(user);
          setIsReviewModalOpen(true);
        }}
        selectedUserIds={selectedUserIds}
        setSelectedUserIds={setSelectedUserIds}
      />

      <ReviewUserModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        user={selectedUser}
        onApprove={handleApproveUser}
        onReject={handleRejectUser}
        canEditRoles={canEditRoles}
      />

      <div className="toast-container-fixed">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className="toast-notification d-flex align-items-center custom-toast"
          >
            <CheckCircle size={18} strokeWidth={2} style={{ color: 'var(--color-success)', marginRight: '10px' }} />
            <span className="fw-medium" style={{ fontSize: '14px' }}>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


const UsersDashboard = ({ users }) => {
  const pendingCount = users.filter(u => u.applicationStatus === 'Pending').length;
  const activeCount = users.filter(u => u.applicationStatus === 'Active').length;
  const suspendedCount = users.filter(u => u.applicationStatus === 'Suspended').length;
  const rejectedCount = users.filter(u => u.applicationStatus === 'Rejected').length;

  return (
    <div className="row g-4 mb-4">
      <div className="col-md-3">
        <div className="card border-0 shadow-sm rounded-4 h-100 d-flex flex-row align-items-center justify-content-between" style={{ padding: '24px' }}>
          <div>
            <div className="text-muted small fw-bold mb-2 text-uppercase letter-spacing-1">Pending</div>
            <div className="fs-2 fw-bold" style={{ color: 'var(--color-warning)' }}>{pendingCount}</div>
          </div>
          <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--color-warning-highlight)', color: 'var(--color-warning)' }}>
            <Clock size={28} strokeWidth={2.5} />
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card border-0 shadow-sm rounded-4 h-100 d-flex flex-row align-items-center justify-content-between" style={{ padding: '24px' }}>
          <div>
            <div className="text-muted small fw-bold mb-2 text-uppercase letter-spacing-1">Active</div>
            <div className="fs-2 fw-bold" style={{ color: 'var(--color-success)' }}>{activeCount}</div>
          </div>
          <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--color-success-highlight)', color: 'var(--color-success)' }}>
            <ShieldCheck size={28} strokeWidth={2.5} />
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card border-0 shadow-sm rounded-4 h-100 d-flex flex-row align-items-center justify-content-between" style={{ padding: '24px' }}>
          <div>
            <div className="text-muted small fw-bold mb-2 text-uppercase letter-spacing-1">Suspended</div>
            <div className="fs-2 fw-bold" style={{ color: 'var(--color-text-muted)' }}>{suspendedCount}</div>
          </div>
          <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--color-surface-offset)', color: 'var(--color-text-muted)' }}>
            <ShieldAlert size={28} strokeWidth={2.5} />
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card border-0 shadow-sm rounded-4 h-100 d-flex flex-row align-items-center justify-content-between" style={{ padding: '24px' }}>
          <div>
            <div className="text-muted small fw-bold mb-2 text-uppercase letter-spacing-1">Rejected</div>
            <div className="fs-2 fw-bold" style={{ color: 'var(--color-error)' }}>{rejectedCount}</div>
          </div>
          <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--color-error-highlight)', color: 'var(--color-error)' }}>
            <XCircle size={28} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
};

const UsersTable = ({ users, activeTab, onViewUser, selectedUserIds, setSelectedUserIds }) => {
  const filteredUsers = users.filter(user => {
    if (activeTab === 'All Users') return true;
    if (activeTab === 'Pending Approval') return user.applicationStatus === 'Pending';
    if (activeTab === 'Active Users') return user.applicationStatus === 'Active';
    if (activeTab === 'Suspended Users') return user.applicationStatus === 'Suspended';
    if (activeTab === 'Rejected Users') return user.applicationStatus === 'Rejected';
    return true;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUserIds(filteredUsers.map(u => u.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectUser = (id) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(prev => prev.filter(uid => uid !== id));
    } else {
      setSelectedUserIds(prev => [...prev, id]);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending': return <span className="badge bg-warning text-dark px-2 py-1">Pending</span>;
      case 'Active': return <span className="badge bg-success px-2 py-1">Active</span>;
      case 'Suspended': return <span className="badge bg-secondary px-2 py-1">Suspended</span>;
      case 'Rejected': return <span className="badge bg-danger px-2 py-1">Rejected</span>;
      default: return null;
    }
  };

  const getVerificationIcon = (status) => {
    switch (status) {
      case 'Verified': return <div className="text-success d-flex align-items-center gap-1"><ShieldCheck size={14}/> Verified</div>;
      case 'Pending': return <div className="text-warning d-flex align-items-center gap-1"><Clock size={14}/> Pending</div>;
      case 'Failed': return <div className="text-danger d-flex align-items-center gap-1"><ShieldAlert size={14}/> Failed</div>;
      default: return <div className="text-muted"><Shield size={14}/> Unknown</div>;
    }
  };

  return (
    <div className="card border p-0 shadow-sm mt-3">
      <div className="table-responsive">
        <table className="table table-hover table-borderless mb-0 align-middle">
          <thead className="table-light border-bottom">
            <tr>
              <th className="py-3 px-4 text-muted small" style={{ backgroundColor: 'var(--color-surface-offset)', width: '40px' }}>
                <input 
                  type="checkbox" 
                  className="form-check-input"
                  checked={filteredUsers.length > 0 && selectedUserIds.length === filteredUsers.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="py-3 px-2 text-muted small fw-bold" style={{ backgroundColor: 'var(--color-surface-offset)' }}>PROFILE</th>
              <th className="py-3 text-muted small fw-bold" style={{ backgroundColor: 'var(--color-surface-offset)' }}>NAME</th>
              <th className="py-3 text-muted small fw-bold" style={{ backgroundColor: 'var(--color-surface-offset)' }}>EMAIL</th>
              <th className="py-3 text-muted small fw-bold" style={{ backgroundColor: 'var(--color-surface-offset)' }}>PHONE</th>
              <th className="py-3 text-muted small fw-bold" style={{ backgroundColor: 'var(--color-surface-offset)' }}>APPLIED DATE</th>
              <th className="py-3 text-muted small fw-bold" style={{ backgroundColor: 'var(--color-surface-offset)' }}>VERIFICATION</th>
              <th className="py-3 text-muted small fw-bold" style={{ backgroundColor: 'var(--color-surface-offset)' }}>ROLE</th>
              <th className="py-3 text-muted small fw-bold" style={{ backgroundColor: 'var(--color-surface-offset)' }}>STATUS</th>
              <th className="py-3 px-4 text-muted small fw-bold text-end" style={{ backgroundColor: 'var(--color-surface-offset)' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-5">
                  <div className="text-muted mb-3 d-flex flex-column align-items-center justify-content-center">
                    <Shield size={48} className="opacity-25 mb-2" />
                    <p className="mb-0 fw-medium">
                      {activeTab === 'Pending Approval' 
                        ? 'No pending approval requests.' 
                        : 'No users found.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-bottom">
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      className="form-check-input"
                      checked={selectedUserIds.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td className="px-2 py-3">
                    <div className="d-flex align-items-center justify-content-center text-white fw-bold shadow-sm user-avatar-circle">
                      {user.initials}
                    </div>
                  </td>
                  <td className="py-3 fw-medium">{user.name}</td>
                  <td className="py-3 text-muted" style={{ fontSize: '14px' }}>{user.email}</td>
                  <td className="py-3 text-muted" style={{ fontSize: '14px' }}>{user.phone}</td>
                  <td className="py-3 text-muted" style={{ fontSize: '14px' }}>{new Date(user.appliedDate).toLocaleDateString()}</td>
                  <td className="py-3" style={{ fontSize: '13px' }}>{getVerificationIcon(user.verificationStatus)}</td>
                  <td className="py-3 fw-bold" style={{ fontSize: '13px', color: 'var(--color-text)' }}>
                    {user.role || <span className="text-muted fw-normal fst-italic">Unassigned</span>}
                  </td>
                  <td className="py-3">{getStatusBadge(user.applicationStatus)}</td>
                  <td className="px-4 py-3 text-end">
                    <button 
                      className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 ms-auto"
                      onClick={() => onViewUser(user)}
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ReviewUserModal = ({ isOpen, onClose, user, onApprove, onReject, canEditRoles }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !user) return null;

  const handleApprove = () => {
    if (!selectedRole) {
      setError('Please select a role before approving.');
      return;
    }
    setError('');
    onApprove(user.id, selectedRole);
    setSelectedRole('');
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      setError('Please provide a reason for rejection.');
      return;
    }
    setError('');
    onReject(user.id, rejectReason);
    setRejectReason('');
    setShowRejectForm(false);
  };

  const isPending = user.applicationStatus === 'Pending';
  const isRejected = user.applicationStatus === 'Rejected';
  const isActive = user.applicationStatus === 'Active';

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending': return <span className="badge bg-warning text-dark px-2 py-1">Pending Approval</span>;
      case 'Active': return <span className="badge bg-success px-2 py-1">Active User</span>;
      case 'Suspended': return <span className="badge bg-secondary px-2 py-1">Suspended</span>;
      case 'Rejected': return <span className="badge bg-danger px-2 py-1">Rejected</span>;
      default: return null;
    }
  };

  return (
    <div className="review-modal-overlay">
      <div className="card shadow-lg review-modal-content modal-card">
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <h5 className="fw-bold mb-0">Review User Profile</h5>
          <button className="btn btn-link text-muted p-0" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="d-flex align-items-center justify-content-center text-white fw-bold shadow-sm user-avatar-large">
            {user.initials}
          </div>
          <div>
            <h4 className="fw-bold mb-1">{user.name}</h4>
            {getStatusBadge(user.applicationStatus)}
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6 d-flex align-items-center gap-2 text-muted">
            <Mail size={16} /> <span style={{ fontSize: '14px' }}>{user.email}</span>
          </div>
          <div className="col-md-6 d-flex align-items-center gap-2 text-muted">
            <Phone size={16} /> <span style={{ fontSize: '14px' }}>{user.phone}</span>
          </div>
          <div className="col-md-6 d-flex align-items-center gap-2 text-muted">
            <MapPin size={16} /> <span style={{ fontSize: '14px' }}>{user.address}</span>
          </div>
          <div className="col-md-6 d-flex align-items-center gap-2 text-muted">
            <Calendar size={16} /> <span style={{ fontSize: '14px' }}>Registered: {new Date(user.appliedDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-4">
          <h6 className="fw-bold text-muted small text-uppercase mb-3">Verification Documents</h6>
          <div className="border rounded p-3 d-flex align-items-center justify-content-between verification-docs-container">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white p-2 rounded border text-primary">
                <FileText size={20} />
              </div>
              <div>
                <div className="fw-bold" style={{ fontSize: '14px' }}>Government ID.pdf</div>
                <div className="text-muted" style={{ fontSize: '12px' }}>Uploaded {new Date(user.appliedDate).toLocaleDateString()}</div>
              </div>
            </div>
            {user.verificationStatus === 'Verified' ? (
              <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1"><ShieldCheck size={12} className="me-1"/>Verified</span>
            ) : user.verificationStatus === 'Failed' ? (
              <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1"><ShieldAlert size={12} className="me-1"/>Failed</span>
            ) : (
              <span className="badge bg-warning-subtle text-dark border border-warning-subtle px-2 py-1"><Clock size={12} className="me-1"/>Pending review</span>
            )}
          </div>
        </div>

        {(!isPending) && (
          <div className="mb-4">
             <h6 className="fw-bold text-muted small text-uppercase mb-3">Audit Information</h6>
             <div className="border rounded p-3 bg-light">
                {isActive && (
                  <>
                    <div style={{ fontSize: '13px' }} className="mb-2"><strong>Assigned Role:</strong> {user.role}</div>
                    <div style={{ fontSize: '13px' }} className="mb-2"><strong>Approved By:</strong> Super Admin</div>
                    <div style={{ fontSize: '13px' }}><strong>Approved On:</strong> {new Date().toLocaleDateString()}</div>
                  </>
                )}
                {isRejected && (
                  <>
                    <div style={{ fontSize: '13px' }} className="mb-2 text-danger"><strong>Rejected By:</strong> {user.rejectedBy || 'Super Admin'}</div>
                    <div style={{ fontSize: '13px' }}><strong>Reason:</strong> {user.rejectReason}</div>
                  </>
                )}
             </div>
          </div>
        )}

        {isPending && !showRejectForm && canEditRoles && (
          <div className="mb-4 border-top pt-4">
            <h6 className="fw-bold text-primary mb-3">Assign Role & Approve</h6>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Select Role to Assign</label>
              <select 
                className="form-select" 
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  setError('');
                }}
              >
                <option value="">-- Choose a role --</option>
                {rolesData.map(r => (
                  <option key={r.role_id} value={r.name}>{r.name}</option>
                ))}
              </select>
            </div>
            
            {error && <div className="text-danger small mb-3">{error}</div>}

            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-outline-danger" onClick={() => setShowRejectForm(true)}>
                Reject Request
              </button>
              <button className="btn btn-success d-flex align-items-center gap-2" onClick={handleApprove}>
                <CheckCircle size={16} /> Approve & Assign Role
              </button>
            </div>
          </div>
        )}

        {isPending && showRejectForm && canEditRoles && (
          <div className="mb-4 border-top pt-4">
            <h6 className="fw-bold text-danger mb-3">Reject Application</h6>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Reason for Rejection</label>
              <textarea 
                className="form-control" 
                rows="3" 
                placeholder="Explain why this request is being rejected..."
                value={rejectReason}
                onChange={(e) => {
                  setRejectReason(e.target.value);
                  setError('');
                }}
              ></textarea>
            </div>

            {error && <div className="text-danger small mb-3">{error}</div>}

            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-outline-secondary" onClick={() => setShowRejectForm(false)}>
                Cancel
              </button>
              <button className="btn btn-danger d-flex align-items-center gap-2" onClick={handleReject}>
                <XCircle size={16} /> Confirm Rejection
              </button>
            </div>
          </div>
        )}

        {(!isPending || !canEditRoles) && (
          <div className="d-flex justify-content-end border-top pt-3">
            <button className="btn btn-outline-secondary px-4" onClick={onClose}>Close</button>
          </div>
        )}

      </div>
    </div>
  );
};

export default UsersManagement;
