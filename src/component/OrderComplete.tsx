import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './OrderComplete.module.css';

const OrderComplete: React.FC = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className={styles.orderComplete}>
      <h2 className={styles.title}>注文完了</h2>
      <p className={styles.message}>ご注文ありがとうございます。注文が正常に処理されました。</p>
      <p className={styles.orderInfo}>注文ID: {orderId}</p>
      <p className={styles.orderInfo}>注文日時: {new Date().toLocaleString()}</p>
      <Link to="/order-history" className={styles.historyButton}>
        注文履歴を見る
      </Link>
    </div>
  );
};

export default OrderComplete;