import { useNavigate } from 'react-router-dom';
import styles from './Error404.module.css';

export function Error404() {
  const navigate = useNavigate();
  return (
    <div className={styles.errorContainer}>
      <div className={styles.error}>
        <h1>404</h1>
        <h2>Page Not Found!</h2>
        <p>The page you are looking for doesn't exist or any other error occured.</p>
        <button className="btn" onClick={() => navigate('/')}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
