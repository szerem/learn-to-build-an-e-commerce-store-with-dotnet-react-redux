import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Basket } from '../model';

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw Error('Oops - we do not seem to be inside the provider');
  }

  return context;
};

// export const StoreProvider = ({ children }: PropsWithChildren<any>) => {
export function StoreProvider({ children }: PropsWithChildren<any>) {
  const [basket, setBasket] = useState<Basket | null>(null);

  const removeItem = (productId: number, quantity: number) => {
    if (!basket) return;
    const items = [...basket.items];
    const index = items.findIndex((i) => i.productId === productId);
    if (index >= 0) {
      items[index].quantity -= quantity;
      if (!(items[index].quantity > 0)) {
        items.splice(index, 1);
        setBasket((prevState) => {
          return { ...prevState!, items };
        });
      }
    }
  };

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
}
