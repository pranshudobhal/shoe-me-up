import styles from './NavbarDesktop.module.css';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

export function NavbarDesktop() {
  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>
          <NavLink to="/" className={styles.navlink}>
            <h1>ShoeMeUp</h1>
          </NavLink>
        </div>
        <div className={styles.actions}>
          <span>
            <SearchIcon style={{ fontSize: 27 }} />
          </span>
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
        </div>
      </div>
    </div>
  );
}
