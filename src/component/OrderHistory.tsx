import React from 'react';
import { useAppContext } from '../util/AppPContext';
import styles from './OrderHistory.module.css';

const OrderHistory: React.FC = () => {
  const { state } = useAppContext();

  return (
    <div className={styles.orderHistory}>
      <h2 className={styles.title}>注文履歴</h2>
      {state.orders.length === 0 ? (
        <p className={styles.emptyHistory}>注文履歴がありません。</p>
      ) : (
        <ul className={styles.orderList}>
          {state.orders.map((order) => (
            <li key={order.id} className={styles.orderItem}>
              <h3 className={styles.orderId}>注文ID: {order.id}</h3>
              <p className={styles.orderDate}>注文日時: {order.date.toLocaleString()}</p>
              <p className={styles.orderTotal}>合計: ￥{order.total.toLocaleString()}</p>
              <ul className={styles.orderItems}>
                {order.items.map((item) => (
                  <li key={item.id} className={styles.orderItemDetail}>
                    {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;