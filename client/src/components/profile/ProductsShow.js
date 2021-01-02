import React from 'react';
import { Link } from 'react-router-dom';

const ProductsShow = (props) => {
  const renderProducts = () => {
    return (
      <div className="ui middle aligned list">
        {props.products.map((product) => {
          return (
            <div className="item" key={product.id}>
              <div className="right floated content">
                <Link
                  to={`/products/update/${product.id}`}
                  className="tiny ui blue animated fade button"
                >
                  <div className="visible content">Update Product</div>
                  <div className="hidden content">
                    <i className="edit outline icon"></i>
                  </div>
                </Link>
              </div>
              <img className="ui mini image" src="/img/img.png" alt="..." />
              <div className="content">
                <Link to={`/products/${product.id}`} className="header">
                  {product.title}
                </Link>
                <div className="">
                  <p>Price: {product.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div>
        <div className="ui stackable two column grid">
          <div className="left floated column">
            <h1>My Products</h1>
          </div>
          <div className="right floated column">
            <Link to="/products/new" className="ui right floated button">
              Add Product
            </Link>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        {renderProducts()}
      </div>
    </>
  );
};

export default ProductsShow;
