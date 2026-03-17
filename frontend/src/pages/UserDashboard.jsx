import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { createComplaint, getMyComplaints } from '../services/api.js';

const initialForm = {
  street: '',
  area: '',
  city: '',
  description: '',
  image: null,
  latitude: null,
  longitude: null
};

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

function UserDashboard() {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const [complaints, setComplaints] = useState([]);
  const [loadingComplaints, setLoadingComplaints] = useState(true);
  const [complaintsError, setComplaintsError] = useState('');

  const [geoStatus, setGeoStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm((prev) => ({ ...prev, image: files?.[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchComplaints = async () => {
    setLoadingComplaints(true);
    setComplaintsError('');
    try {
      const data = await getMyComplaints();
      setComplaints(data || []);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        setComplaintsError('Session expired. Please login again.');
      } else {
        setComplaintsError('Failed to load complaints.');
      }
    } finally {
      setLoadingComplaints(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoStatus('Geolocation is not supported by this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm((prev) => ({ ...prev, latitude, longitude }));
        setGeoStatus('Location captured.');
      },
      () => {
        setGeoStatus('Unable to access your location. You can still submit a complaint.');
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    if (!form.image) {
      setSubmitError('Please attach an image of the garbage spot.');
      return;
    }

    const fd = new FormData();
    fd.append('street', form.street);
    fd.append('area', form.area);
    fd.append('city', form.city);
    fd.append('description', form.description);
    fd.append('image', form.image);
    if (form.latitude != null && form.longitude != null) {
      fd.append('latitude', form.latitude);
      fd.append('longitude', form.longitude);
    }

    setSubmitting(true);
    try {
      await createComplaint(fd);
      setSubmitSuccess('Complaint submitted successfully.');
      setForm(initialForm);
      await fetchComplaints();
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        setSubmitError('You are not authorized. Please login again.');
      } else {
        setSubmitError('Failed to submit complaint. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-5">
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Your Profile</h5>
              <p className="mb-1">
                <strong>Name:</strong> {user?.name}
              </p>
              <p className="mb-1">
                <strong>Email:</strong> {user?.email}
              </p>
              <p className="mb-1">
                <strong>Role:</strong> {user?.role}
              </p>
              <p className="mb-0">
                <strong>City:</strong> {user?.city || '—'}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Submit Garbage Complaint</h5>

              {submitError && (
                <div className="alert alert-danger" role="alert">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="alert alert-success" role="alert">
                  {submitSuccess}
                </div>
              )}

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="street">
                      Street
                    </label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      className="form-control"
                      required
                      value={form.street}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="area">
                      Area
                    </label>
                    <input
                      id="area"
                      name="area"
                      type="text"
                      className="form-control"
                      required
                      value={form.area}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="city">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="form-control"
                    required
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows="3"
                    required
                    value={form.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {geoStatus && (
                  <p className="text-muted mb-2" style={{ fontSize: '0.85rem' }}>
                    {geoStatus}
                  </p>
                )}

                <div className="mb-3">
                  <label className="form-label" htmlFor="image">
                    Image
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="form-control"
                    accept="image/*"
                    required
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-success" disabled={submitting}>
                  {submitting && (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  )}
                  Submit Complaint
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <section>
        <h3 className="h4 mb-3">My Complaints</h3>
        {loadingComplaints ? (
          <div className="d-flex align-items-center">
            <div className="spinner-border text-primary me-2" role="status" aria-hidden="true"></div>
            <span>Loading your complaints...</span>
          </div>
        ) : complaintsError ? (
          <div className="alert alert-danger" role="alert">
            {complaintsError}
          </div>
        ) : complaints.length === 0 ? (
          <p className="text-muted">You have not submitted any complaints yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Street</th>
                  <th scope="col">Area</th>
                  <th scope="col">City</th>
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created At</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id}>
                    <td>
                      {c.imageUrl ? (
                        <img
                          src={c.imageUrl}
                          alt="Garbage"
                          className="img-thumbnail"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                      ) : (
                        <span className="text-muted small">No image</span>
                      )}
                    </td>
                    <td>{c.street}</td>
                    <td>{c.area}</td>
                    <td>{c.city}</td>
                    <td style={{ maxWidth: '220px' }}>{c.description}</td>
                    <td>
                      <span className={statusBadgeClass(c.status)}>{c.status}</span>
                    </td>
                    <td>{c.createdAt ? new Date(c.createdAt).toLocaleString() : '—'}</td>
                    <td>{c.latitude != null && c.longitude != null ? `${c.latitude}, ${c.longitude}` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

    </div>
  );
}

export default UserDashboard;

