import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.titlePart}>日用品の</span>{' '}
          <span className={styles.titleHighlight}>オンラインストア</span>
        </h1>
        <p className={styles.description}>
          品質にこだわった日用品を、お手頃価格でお届けします。生活に必要なものが、ここですべて揃います。
        </p>
        <div className={styles.ctaContainer}>
          <Link to="/products" className={styles.ctaButton}>
            商品を見る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;