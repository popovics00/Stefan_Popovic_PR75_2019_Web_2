import React from 'react';
import { Style } from '../../styles/cart';
function CartSidebar() {
  // Dobijanje proizvoda iz korpe
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Funkcija za uklanjanje proizvoda iz korpe
  const removeFromCart = (productId) => {
    // Implementacija uklanjanja proizvoda iz korpe
    // Možete koristiti neku korisničku funkcionalnost ili biblioteku za upravljanje korisničkom korpu

    // Na primer, korisnička funkcionalnost:
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // Ukoliko koristite neku biblioteku za upravljanje korisničkom korpu,
    // sledite njihovu dokumentaciju za uklanjanje proizvoda iz korpe
  };

  return (
    <div className="sidebar">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.price} RSD</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartSidebar;
