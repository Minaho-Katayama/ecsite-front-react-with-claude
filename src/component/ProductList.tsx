import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../util/AppPContext';
import styles from './ProductList.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageSrc: string;
}

const products: Product[] = [
  {
    id: 1,
    name: '高品質タオルセット',
    price: 2980,
    description: '柔らかく吸水性の高い上質なタオルセット',
    imageSrc: '/api/placeholder/200/200',
  },
  {
    id: 2,
    name: 'ステンレス製水筒',
    price: 3980,
    description: '保温・保冷機能付きの耐久性のある水筒',
    imageSrc: '/api/placeholder/200/200',
  },
  {
    id: 3,
    name: 'オーガニックハンドソープ',
    price: 980,
    description: '自然由来成分で作られた優しいハンドソープ',
    imageSrc: '/api/placeholder/200/200',
  },
];

const ProductList: React.FC = () => {
  const { dispatch } = useAppContext();

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity: 1 } });
  };

  return (
    <div className={styles.productList}>
      <h2 className={styles.title}>商品一覧</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.product}>
            <div className={styles.imageContainer}>
              <img src={product.imageSrc} alt={product.name} className={styles.image} />
            </div>
            <div className={styles.details}>
              <h3 className={styles.productName}>
                <Link to={`/product/${product.id}`} className={styles.productLink}>
                  {product.name}
                </Link>
              </h3>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>￥{product.price.toLocaleString()}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className={styles.addToCartButton}
              >
                カートに追加
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;