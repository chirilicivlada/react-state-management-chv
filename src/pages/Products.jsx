import React, { useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { CartContext } from '../store/Cart/context';
import { addToCart } from '../store/Cart/actions';
import { addToFav } from '../store/Favorites/actions';
import { FavoritesContext } from '../store/Favorites/context';

export function Products() {
  const { dispatch } = useContext(CartContext);
  const {favDispatch} = useContext(FavoritesContext);
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals')
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  function handleAddToCart(product) {
   const actionResult = addToCart(product);
    dispatch(actionResult);
  }
  function handleAddToFav(product) {
    const actionResult = addToFav(product);
    favDispatch(actionResult);
  }


  return (
    <div>
      <div className="d-flex flex-column align-items-center">
       {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: '18rem' }}
              className="m-3"
            >
              <Link
                to={`/product/${encodeURI(product.dealID)}`}
                className="text-dark"
              >
                <Card.Img variant="top" src={product.thumb} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-danger">
                    {product.salePrice} $
                  </Card.Text>
                </Card.Body>
              </Link>
              <Button
                variant="success"
                onClick={() => {
                 handleAddToCart({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.name,
                    price: product.salePrice,
                  });
                }}
              >
                Adaugă în coș
              </Button>
              <Button
                variant="outline-success"
                onClick={() => {
                  // Contruim payload-ul si il pasam ca argument functiei care va declansa actiunea de adaugare la favorite.
                  handleAddToFav({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice,
                  });
                }}
              >
                Adaugă la favorite
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}