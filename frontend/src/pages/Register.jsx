// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { register } from '../services/api.js';
// import { useAuth } from '../context/AuthContext.jsx';

// const initialForm = {
//   name: '',
//   email: '',
//   password: '',
//   mobileNumber: '',
//   address: '',
//   city: '',
//   role: 'USER'
// };

// function Register() {
//   const [form, setForm] = useState(initialForm);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();
//   const { setAuthFromResponse } = useAuth();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     const emailPattern = /\S+@\S+\.\S+/;
//     if (!emailPattern.test(form.email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }
//     if (!form.password || form.password.length < 6) {
//       setError('Password must be at least 6 characters.');
//       return;
//     }
//     if (form.role === 'USER') {
//       if (!form.mobileNumber || form.mobileNumber.trim().length === 0) {
//         setError('Mobile Number is required for user registration.');
//         return;
//       }
//       if (!form.address || form.address.trim().length === 0) {
//         setError('Address is required for user registration.');
//         return;
//       }
//     }

//     setSubmitting(true);
//     try {
//       const data = await register(form);
//       setAuthFromResponse(data);
//       setSuccess('Registration successful! Redirecting to dashboard...');
//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 800);
//     } catch (err) {
//       const msg =
//         err?.response?.data?.message ||
//         (err?.response?.status === 409 ? 'Email already registered.' : 'Registration failed. Please try again.');
//       setError(msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="row justify-content-center">
//       <div className="col-md-6">
//         <div className="card shadow-sm">
//           <div className="card-body p-4">
//             <h2 className="mb-3 text-center">Create Account</h2>
//             <p className="text-muted text-center mb-4">Report garbage issues and track their resolution.</p>

//             {error && (
//               <div className="alert alert-danger" role="alert">
//                 {error}
//               </div>
//             )}
//             {success && (
//               <div className="alert alert-success" role="alert">
//                 {success}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} noValidate>
//               <div className="mb-3">
//                 <label className="form-label" htmlFor="name">
//                   Name
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   className="form-control"
//                   required
//                   value={form.name}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label" htmlFor="email">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   className="form-control"
//                   required
//                   value={form.email}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label" htmlFor="password">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   className="form-control"
//                   required
//                   minLength={6}
//                   value={form.password}
//                   onChange={handleChange}
//                 />
//               </div>

//               {form.role === 'USER' && (
//                 <div className="mb-3">
//                   <label className="form-label" htmlFor="mobileNumber">
//                     Mobile Number
//                   </label>
//                   <input
//                     id="mobileNumber"
//                     name="mobileNumber"
//                     type="tel"
//                     className="form-control"
//                     required
//                     value={form.mobileNumber}
//                     onChange={handleChange}
//                   />
//                 </div>
//               )}

//               {form.role === 'USER' && (
//                 <div className="mb-3">
//                   <label className="form-label" htmlFor="address">
//                     Address
//                   </label>
//                   <input
//                     id="address"
//                     name="address"
//                     type="text"
//                     className="form-control"
//                     required
//                     value={form.address}
//                     onChange={handleChange}
//                   />
//                 </div>
//               )}

//               <div className="mb-3">
//                 <label className="form-label" htmlFor="city">
//                   City
//                 </label>
//                 <input
//                   id="city"
//                   name="city"
//                   type="text"
//                   className="form-control"
//                   required
//                   value={form.city}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label" htmlFor="role">
//                   Role
//                 </label>
//                 <select id="role" name="role" className="form-select" value={form.role} onChange={handleChange}>
//                   <option value="USER">User</option>
//                   <option value="ADMIN">Admin</option>
//                 </select>
//               </div>

//               <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
//                 {submitting && (
//                   <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                 )}
//                 Register
//               </button>
//             </form>

//             <p className="mt-3 mb-0 text-center">
//               Already have an account? <Link to="/login">Login</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const initialForm = {
  name: '',
  email: '',
  password: '',
  mobileNumber: '',
  address: '',
  city: '',
  role: 'USER'
};

function Register() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { setAuthFromResponse } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!form.password || form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (form.role === 'USER') {
      if (!form.mobileNumber.trim()) {
        setError('Mobile Number is required.');
        return;
      }
      if (!form.address.trim()) {
        setError('Address is required.');
        return;
      }
    }

    setSubmitting(true);
    try {
      const data = await register(form);
      setAuthFromResponse(data);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (err?.response?.status === 409
          ? 'Email already registered.'
          : 'Registration failed.');
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="card shadow" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-3">Create Account</h2>
          <p className="text-center text-muted mb-4">
            Report garbage issues and track them
          </p>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-control mb-3"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control mb-3"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control mb-3"
              value={form.password}
              onChange={handleChange}
              required
            />

            {form.role === 'USER' && (
              <>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  className="form-control mb-3"
                  value={form.mobileNumber}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="form-control mb-3"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <input
              type="text"
              name="city"
              placeholder="City"
              className="form-control mb-3"
              value={form.city}
              onChange={handleChange}
              required
            />

            <select
              name="role"
              className="form-select mb-3"
              value={form.role}
              onChange={handleChange}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={submitting}
            >
              {submitting ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;