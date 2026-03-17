import React, { useEffect, useMemo, useState } from 'react';
import { getAllComplaints, getAdminDashboardStats, updateComplaintStatus } from '../services/api.js';
import { API_BASE } from '../services/api.js';

function statusBadgeClass(status) {
  switch (status) {
    case 'COMPLETED':
      return 'badge bg-success';
    case 'CLEANING':
      return 'badge bg-info text-dark';
    case 'PENDING':
    default:
      return 'badge bg-warning text-dark';
  }
}

const STATUSES = ['PENDING', 'CLEANING', 'COMPLETED'];

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [preview, setPreview] = useState({ open: false, url: '', title: '' });

  const [stats, setStats] = useState(null);

  const [statusFilter, setStatusFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const fetchComplaints = async () => {
    setLoading(true);
    setError('');
    try {
      const [complaintsData, statsData] = await Promise.all([getAllComplaints(), getAdminDashboardStats()]);
      setComplaints(complaintsData || []);
      setStats(statsData || null);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        setError('You are not authorized. Please login as an admin.');
      } else {
        setError('Failed to load complaints.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const updated = await updateComplaintStatus(id, newStatus);
      setComplaints((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const statusOk = statusFilter ? c.status === statusFilter : true;
      const cityOk = cityFilter ? c.city?.toLowerCase().includes(cityFilter.toLowerCase()) : true;
      return statusOk && cityOk;
    });
  }, [complaints, statusFilter, cityFilter]);

  const resolveImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/')) return `${API_BASE}${url}`;
    return `${API_BASE}/${url}`;
  };

  return (
    <div>
      {stats && (
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <p className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem' }}>
                  Total Complaints
                </p>
                <h3 className="mb-0">{stats.totalComplaints ?? 0}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <p className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem' }}>
                  Pending
                </p>
                <h3 className="mb-0 text-warning">{stats.pendingComplaints ?? 0}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <p className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem' }}>
                  Cleaning In Progress
                </p>
                <h3 className="mb-0 text-info">{stats.cleaningComplaints ?? 0}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <p className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem' }}>
                  Completed
                </p>
                <h3 className="mb-0 text-success">{stats.completedComplaints ?? 0}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Admin Complaints Dashboard</h2>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={fetchComplaints} disabled={loading}>
          {loading && (
            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          )}
          Refresh
        </button>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Filters</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label" htmlFor="statusFilter">
                Status
              </label>
              <select
                id="statusFilter"
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="cityFilter">
                City
              </label>
              <input
                id="cityFilter"
                type="text"
                className="form-control"
                placeholder="Filter by city name"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="d-flex align-items-center">
          <div className="spinner-border text-primary me-2" role="status" aria-hidden="true"></div>
          <span>Loading complaints...</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : filteredComplaints.length === 0 ? (
        <p className="text-muted">No complaints found for the selected filters.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">User</th>
                <th scope="col">Email</th>
                <th scope="col">City</th>
                <th scope="col">Area / Street</th>
                <th scope="col">Status</th>
                <th scope="col">Created At</th>
                <th scope="col">Image</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.userName}</td>
                  <td>{c.userEmail}</td>
                  <td>{c.city}</td>
                  <td>
                    {c.area}, {c.street}
                  </td>
                  <td>
                    <span className={statusBadgeClass(c.status)}>{c.status}</span>
                  </td>
                  <td>{c.createdAt ? new Date(c.createdAt).toLocaleString() : '—'}</td>
                  <td>
                    {c.imageUrl ? (
                      <button
                        type="button"
                        className="btn p-0 border-0 bg-transparent"
                        onClick={() =>
                          setPreview({
                            open: true,
                            url: resolveImageUrl(c.imageUrl),
                            title: `Complaint #${c.id} photo`
                          })
                        }
                        aria-label="Preview image"
                      >
                        <img
                          src={resolveImageUrl(c.imageUrl)}
                          alt="Garbage"
                          className="img-thumbnail"
                          style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                        />
                      </button>
                    ) : (
                      <span className="text-muted small">No image</span>
                    )}
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm" role="group" aria-label="Status actions">
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`btn btn-outline-${s === c.status ? 'primary' : 'secondary'}`}
                          disabled={updatingId === c.id || c.status === s}
                          onClick={() => handleStatusChange(c.id, s)}
                        >
                          {updatingId === c.id && s !== c.status ? (
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : (
                            s
                          )}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {preview.open && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{preview.title || 'Image Preview'}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setPreview({ open: false, url: '', title: '' })}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3 text-center">
                    <img src={preview.url} alt="Complaint preview" className="img-fluid rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setPreview({ open: false, url: '', title: '' })} />
        </>
      )}
    </div>
  );
}

export default AdminDashboard;


