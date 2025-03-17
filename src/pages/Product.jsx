import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { CartContext } from '../store/Cart/context';
import { addToCart } from '../store/Cart/actions';
import { addToFav } from '../store/Favorites/actions';
import { FavoritesContext } from '../store/Favorites/context';

export function Product() {

  const { dispatch } = useContext(CartContext);
  

  let { id } = useParams();
  id = decodeURI(id);
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?id=${id}`)
      .then((response) => response.json())
      .then((product) => {
        setProduct(product);
      });
  }, [id]);
const productInfo = product.gameInfo || {};
  const { thumb, name, salePrice, retailPrice } = productInfo;

  
  function handleAddToCart(product) {
    const actionResult = addToCart(product);
    dispatch(actionResult);
  }
  function handleAddToFav(product) {
    const actionResult = addToFav(product);
    favDispatch(actionResult);

  }

  return (
    <div className="d-flex my-3 px-2">
      <div className="w-50">
        <div>
          <img src={thumb} alt="" />
        </div>
        <h1>{name}</h1>
      </div>
      <div className="w-50">
        <p>Preț întreg: {retailPrice}$</p>
        <p>
          Preț redus: <span className="text-danger">{salePrice}$</span>
        </p>
        <Button
          variant="success"
          onClick={() => {
             handleAddToCart({
              id,
              image: thumb,
              name: name,
              price: retailPrice,
            });
          }}
        >
          Adaugă în coș
        </Button>
        <Button
          variant="success-1"
          onClick={() => {
          
            handleAddToFav({
              id,
              image: thumb,
              name:name,
              price: retailPrice,
            });
          }}
        >
          Adaugă în favorite
        </Button>
      </div>
    </div>
  );
  
}
