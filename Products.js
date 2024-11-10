// src/components/Products.js
import React, { useEffect, useState } from 'react';
import { ref, get, child } from 'firebase/database';
import database from '../firebase';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'products'));

        if (snapshot.exists()) {
          const productsData = snapshot.val();
          const productsList = Object.keys(productsData).map(key => ({
            id: key,
            ...productsData[key],
          }));
          setProducts(productsList);
        } else {
          setError("No products found.");
        }
      } catch (err) {
        setError("Failed to load products.");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {error ? <p>{error}</p> : (
        <ul>
          {products.map(product => (
            <li key={product.id}>Product ID: {product.id}, Details: {JSON.stringify(product)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;
