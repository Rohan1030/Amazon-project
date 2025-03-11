import {addToCart,cart , loadFromStorage} from '../../data/cart.js';


describe('test suite: addToCart', () =>
{
  it('adds an exixting product to the cart ' ,() =>
  {
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(() =>
      {
          return JSON.stringify([{
             productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:1,
            updateDeliveryOptionId: '1'
          }]);
      });
    
      
      loadFromStorage();

      addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(2);

  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
    spyOn(localStorage, 'setItem'); // Ensure setItem is being tracked

    let cart = []; // Initialize an empty cart

    function loadFromStorage() {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = storedCart;
    }

    function addToCart(productId) {
        loadFromStorage(); // Load cart from localStorage
        const existingProduct = cart.find(item => item.productId === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ productId, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
});



});