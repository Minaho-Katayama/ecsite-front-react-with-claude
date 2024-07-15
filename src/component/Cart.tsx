import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../util/AppPContext';
import styles from './Cart.module.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageSrc: string;
}

const Cart: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
    } else {
      dispatch({ type: 'UPDATE_CART_ITEM', payload: { id, quantity } });
    }
  };

  const handleRemove = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.cart}>
      <h2 className={styles.title}>ショッピングカート</h2>
      {state.cart.length === 0 ? (
        <p className={styles.emptyCart}>カートに商品がありません。</p>
      ) : (
        <>
          <div className={styles.cartItems}>
            {state.cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.imageSrc} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>￥{item.price.toLocaleString()}</p>
                </div>
                <div className={styles.itemActions}>
                  <div className={styles.quantityControl}>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className={styles.removeButton}
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cartSummary}>
            <p className={styles.total}>合計: ￥{total.toLocaleString()}</p>
            <Link to="/checkout" className={styles.checkoutButton}>
              レジに進む
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;