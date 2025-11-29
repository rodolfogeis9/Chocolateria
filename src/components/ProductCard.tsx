import { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const changeQuantity = (value: number) => {
    setQuantity((prev) => Math.max(1, prev + value));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="card-shadow rounded-2xl bg-white overflow-hidden flex flex-col"
    >
      <div className="relative h-52">
        <img
          src={product.imageUrl}
          alt={product.nombre}
          className="h-full w-full object-cover"
        />
        <span className="absolute top-3 left-3 badge bg-cream/90">{product.categoria}</span>
      </div>
      <div className="p-5 flex-1 flex flex-col space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-chocolate">{product.nombre}</h3>
          <span className="text-lg font-bold text-gold">$ {product.precio.toLocaleString('es-CL')}</span>
        </div>
        <p className="text-sm text-text-dark/80 flex-1">{product.descripcion}</p>
        <p className="text-xs text-text-dark/60">
          Presentación: {product.cantidad} {product.tipoMedida === 'gramos' ? 'g' : 'unidades'}
        </p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-3">
            <button
              className="px-3 py-2 rounded-lg bg-chocolate text-cream hover:bg-chocolate/90 transition"
              onClick={() => changeQuantity(-1)}
              aria-label="Disminuir cantidad"
            >
              −
            </button>
            <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
            <button
              className="px-3 py-2 rounded-lg bg-chocolate text-cream hover:bg-chocolate/90 transition"
              onClick={() => changeQuantity(1)}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-lg font-semibold transition transform hover:-translate-y-0.5 hover:shadow-lg flex items-center space-x-2 ${
              added ? 'bg-green-600 text-white' : 'bg-gold text-text-dark'
            }`}
          >
            <span>{added ? 'Agregado' : 'Agregar al carro'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
