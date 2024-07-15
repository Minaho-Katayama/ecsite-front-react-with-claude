import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ClipboardList } from 'lucide-react';
import { useAppContext } from '../util/AppPContext';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { state } = useAppContext();
  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <div className={styles.navLeft}>
          <Link to="/" className={styles.logo}>
            <span>ECサイト</span>
          </Link>
          <div className={styles.navLinks}>
            <Link to="/products" className={styles.navLink}>
              商品一覧
            </Link>
          </div>
        </div>
        <div className={styles.navRight}>
          <Link to="/order-history" className={styles.navIcon}>
            <ClipboardList />
          </Link>
          <Link to="/cart" className={styles.navIcon}>
            <ShoppingCart />
            {cartItemCount > 0 && (
              <span className={styles.cartBadge}>{cartItemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;