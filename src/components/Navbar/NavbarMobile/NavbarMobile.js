import styles from './NavbarMobile.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { useAuth } from '../../../context';

export function NavbarMobile() {
  const { token, logoutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>
          <NavLink to="/" className={styles.navlink}>
            <h1>ShoeMeUp</h1>
          </NavLink>
        </div>
        <div className={styles.actions}>
          <NavLink to="/wishlist" className={styles.navlink}>
            <span>
              <FavoriteBorderOutlinedIcon style={{ fontSize: 27 }} />
            </span>
          </NavLink>
          <NavLink to="/cart" className={styles.navlink}>
            <span>
              <LocalMallOutlinedIcon style={{ fontSize: 27 }} />
            </span>
          </NavLink>
          <span>
            {token ? (
              <button className={styles.authButton} onClick={() => logoutUser()}>
                Logout
              </button>
            ) : (
              <button className={styles.authButton} onClick={() => navigate('/login')}>
                Login
              </button>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
