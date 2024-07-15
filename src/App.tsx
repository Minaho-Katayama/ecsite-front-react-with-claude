import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ShoppingCart, ClipboardList } from 'lucide-react';
import { AppProvider } from './util/AppPContext';

// コンポーネントのインポート
import Header from './component/Header';
import Home from './component/Home';
import ProductList from './component/ProductList';
import ProductDetail from './component/ProductDetail';
import Cart from './component/Cart';
import Checkout from './component/Checkout';
import OrderComplete from './component/OrderComplete';
import OrderHistory from './component/OrderHistory';

import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className={styles.app}>
          <Header />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-complete" element={<OrderComplete />} />
              <Route path="/order-history" element={<OrderHistory />} />
            </Routes>
          </main>
          <footer className={styles.footer}>
            <div className={styles.footerContent}>
              <p>&copy; 2024 ECサイト, Inc. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;