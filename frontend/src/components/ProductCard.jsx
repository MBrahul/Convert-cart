import React from 'react';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const {
    title,
    price,
    stock_status,
    stock_quantity,
    category,
    tags,
    on_sale,
    created_at,
  } = product;

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        width: '250px',
        margin: '10px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ margin: '4px 0' }}>
        <strong>Price:</strong> ₹{price || 'N/A'}
      </p>
      <p style={{ margin: '4px 0' }}>
        <strong>Status:</strong>{' '}
        <span style={{ color: stock_status === 'instock' ? 'green' : 'red' }}>
          {stock_status}
        </span>
      </p>
      <p style={{ margin: '4px 0' }}>
        <strong>Stock Quantity:</strong> {stock_quantity ?? 'N/A'}
      </p>
      <p style={{ margin: '4px 0' }}>
        <strong>Category:</strong> {category || 'N/A'}
      </p>
      <p style={{ margin: '4px 0' }}>
        <strong>Tags:</strong>{' '}
        {tags && tags.length > 0 ? tags.join(', ') : 'None'}
      </p>
      <p style={{ margin: '4px 0' }}>
        <strong>On Sale:</strong>{' '}
        <span style={{ color: on_sale ? 'green' : 'gray' }}>
          {on_sale ? 'Yes' : 'No'}
        </span>
      </p>
      <small style={{ color: '#777' }}>
        Created: {new Date(created_at).toLocaleDateString()}
      </small>
    </div>
  );
};

export default ProductCard;
