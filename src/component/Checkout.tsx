import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../util/AppPContext';
import styles from './Checkout.module.css';

interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [form, setForm] = useState<CheckoutForm>({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = {
      id: `ORD-${Date.now()}`,
      items: state.cart,
      total: total,
      date: new Date(),
    };
    dispatch({ type: 'ADD_ORDER', payload: { order } });
    navigate('/order-complete', { state: { orderId: order.id } });
  };

  return (
    <div className={styles.checkout}>
      <h2 className={styles.title}>チェックアウト</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>お名前</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>住所</label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="city" className={styles.label}>市区町村</label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="postalCode" className={styles.label}>郵便番号</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cardNumber" className={styles.label}>クレジットカード番号</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="expiryDate" className={styles.label}>有効期限</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              required
              placeholder="MM/YY"
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cvv" className={styles.label}>CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>注文を確定する</button>
      </form>
    </div>
  );
};

export default Checkout;