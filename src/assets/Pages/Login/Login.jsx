import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../../utils/api';
import style from './Login.module.css';
import logo from '../../images/logo.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect straight to dashboard
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await authAPI.login(username, password);
      if (data.message === 'Login successful') {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      if(err.response?.status === 429) {
        setError(err.response?.data?.message || 'Too many login attempts. Please try again later.');
      } else {
        setError(err.response?.data?.message || 'Login failed. Please check your credentials or backend server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.pageContainer}>
      <div className={style.loginCard}>
        <div className={style.header}>
          <img src={logo} alt="Bioryx Logo" className={style.logo} />
          <h1 className={style.title}>BIORYX</h1>
          <p className={style.subtitle}>Admin Sign-In</p>
        </div>

        {error && (
          <div className={style.errorAlert}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={style.alertIcon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.inputGroup}>
            <label htmlFor="username" className={style.label}>Username or Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={style.input}
              placeholder="Enter username"
              required
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="password" className={style.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={style.input}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className={style.submitBtn}>
            {loading ? (
              <span className={style.spinner}></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <button onClick={() => navigate('/')} className={style.backBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Website
        </button>
      </div>
    </div>
  );
}
