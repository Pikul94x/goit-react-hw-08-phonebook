import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from 'redux/auth';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', password: '' });
  const handleChange = event => {
    const { name, value } = event.currentTarget;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };
  const handleSubmit = event => {
    event.preventDefault();
    dispatch(authOperations.logIn({ ...form }));
    setForm({ email: '', password: '' });
  };
  const { email, password } = form;

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Please enter your email and password</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
            title="Enter your email"
            placeholder="Example user@mail.com"
            required
            value={email}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            type="password"
            name="password"
            title="Enter your password"
            required
            value={password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={styles.button}>
          Log In
        </button>
      </form>
    </div>
  );
}
