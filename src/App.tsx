import HomePage from './pages/Home';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <HomePage />
    </CartProvider>
  );
};

export default App;
