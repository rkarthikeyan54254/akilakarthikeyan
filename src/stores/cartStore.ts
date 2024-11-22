import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  coverImage: string;
}

export const cartItems = persistentAtom<CartItem[]>('cart-items', [], {
  encode: JSON.stringify,
  decode: JSON.parse
});

export function addToCart(item: Omit<CartItem, 'quantity'>) {
  const currentItems = cartItems.get();
  const existingItem = currentItems.find(i => i.id === item.id);

  if (existingItem) {
    cartItems.set(
      currentItems.map(i => 
        i.id === item.id 
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  } else {
    cartItems.set([...currentItems, { ...item, quantity: 1 }]);
  }
}

export function removeFromCart(id: string) {
  const currentItems = cartItems.get();
  cartItems.set(currentItems.filter(item => item.id !== id));
}

export function updateQuantity(id: string, quantity: number) {
  const currentItems = cartItems.get();
  if (quantity < 1) {
    removeFromCart(id);
    return;
  }
  
  cartItems.set(
    currentItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    )
  );
}

export function getCartTotal() {
  return cartItems.get().reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );
}

export function clearCart() {
  cartItems.set([]);
}