import styles from './NavbarMobile.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
// import SearchIcon from '@material-ui/icons/Search';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
// import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
          {/* <span>
          <SearchIcon />
        </span> */}
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
          {/* <span>
            <MenuOutlinedIcon style={{ fontSize: 30 }} />
          </span> */}
          <span>{token ? <ExitToAppIcon onClick={() => logoutUser()} style={{ fontSize: 27 }} /> : <AccountCircleIcon onClick={() => navigate('/login')} style={{ fontSize: 27 }} />}</span>
        </div>
      </div>
    </div>
  );
}
