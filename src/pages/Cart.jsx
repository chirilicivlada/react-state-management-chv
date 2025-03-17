import React from 'react';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { CartContext } from '../store/Cart/context';
import { removeFromCart } from '../store/Cart/actions';

export function Cart() {
  const { state, dispatch } = useContext(CartContext);
  function handleCartRemove(id) {
    const actionResult = removeFromCart(id);
    dispatch(actionResult);
  }

  return (
    <div className="mx-2">
      {state.products.length === 0 ? (
        <p>Nu ai produse in cos.</p>
      ) : (
        state.products.map((product) => {
          const totalProductPrice = product.price * product.quantity;
          return (
            <div key={product.id} className="m-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <img src={product.image} alt="" />
                <strong>{product.name}</strong>
                <p>
                  {product.quantity} X {product.price}$ = {totalProductPrice}$
                </p>
              </div>
              <Button
                variant="danger"
                onClick={() => handleCartRemove(product.id)}
              >
                Remove
              </Button>
            </div>
          );
        })
      )}
    </div>
  );
}