import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/';
import styles from './SignUp.module.css';

export function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { token, signUpUser } = useAuth();
  const navigate = useNavigate();

  const signUpHandler = async () => {
    if (firstName && email && password !== '') {
      const signUpResponse = await signUpUser(firstName, lastName, email, password);

      if (signUpResponse === 409) {
        setError('User already exists');
      }
    }
  };

  useEffect(() => {
    token && navigate('/');
  }, [token, navigate]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <h1>Sign Up</h1>
          <p>{error}</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="firstname">First Name: </label>
            <input type="text" id="firstname" name="firstname" value={firstName} onChange={(e) => setFirstName(() => e.target.value)} required /> <br />
            <label htmlFor="lastname">Last Name: </label>
            <input type="text" id="lastname" name="lastname" value={lastName} onChange={(e) => setLastName(() => e.target.value)} />
            <br />
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(() => e.target.value)} required />
            <br />
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(() => e.target.value)} required />
            <br />
            <br />
            <button onClick={signUpHandler}>Signup</button>
          </form>
        </div>
      </div>
    </>
  );
}
