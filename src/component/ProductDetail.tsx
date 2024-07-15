import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../util/AppPContext';
import styles from './ProductDetail.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageSrc: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState<number>(1);
  const { dispatch } = useAppContext();

  // この例では、商品データをハードコードしていますが、実際のアプリケーションでは
  // APIからデータを取得するなどの方法で動的に商品情報を取得します。
  const product: Product = {
    id: parseInt(id || '0'),
    name: '高品質タオルセット',
    price: 2980,
    description: '柔らかく吸水性の高い上質なタオルセット。長持ちする耐久性と、肌触りの良さを兼ね備えています。',
    imageSrc: '/api/placeholder/400/400',
  };

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };


  return (
    <div className={styles.productDetail}>
      <div className={styles.productImage}>
        <img src={product.imageSrc} alt={product.name} />
      </div>
      <div className={styles.productInfo}>
        <h1 className={styles.productName}>{product.name}</h1>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>￥{product.price.toLocaleString()}</p>
        <div className={styles.quantitySelector}>
          <label htmlFor="quantity" className={styles.quantityLabel}>数量:</label>
          <select
            id="quantity"
            className={styles.quantitySelect}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleAddToCart} className={styles.addToCartButton}>
          カートに追加
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;