import { useMemo, useState } from 'react';
import { FaTrash, FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_NUMBER } from '../config/settings';
import { useCart } from '../context/CartContext';

const buildOrderText = (items: ReturnType<typeof useCart>['items']) => {
  const parts = items.map((item) => {
    const descriptor =
      item.product.categoria === 'chocolate'
        ? `${item.product.cantidad} g`
        : `caja de ${item.product.cantidad} alfajores`;
    const label = item.product.categoria === 'chocolate' ? 'chocolate' : 'caja';
    return `${item.quantity} ${label}${item.quantity > 1 ? 's' : ''} de ${descriptor}`;
  });

  if (parts.length === 1) return `Hola, quiero ${parts[0]}.`;
  const last = parts.pop();
  return `Hola, quiero ${parts.join(', ')} y ${last}.`;
};

const Cart = () => {
  const { items, total, updateQuantity, removeItem } = useCart();
  const [error, setError] = useState('');

  const handleSendOrder = () => {
    if (items.length === 0) {
      setError('Tu carro está vacío, agrega productos antes de enviar tu pedido.');
      return;
    }
    setError('');
    const text = buildOrderText(items);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const orderLines = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        subtotal: item.product.precio * item.quantity,
      })),
    [items]
  );

  return (
    <aside className="w-full lg:w-96 bg-white rounded-2xl card-shadow p-6 sticky top-24 self-start">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-chocolate">Carrito</h3>
        <span className="badge">{items.length} producto(s)</span>
      </div>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {orderLines.length === 0 && <p className="text-sm text-text-dark/70">Aún no agregas productos.</p>}
        {orderLines.map((item) => (
          <div key={item.product.id} className="border border-chocolate/10 rounded-lg p-3 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-text-dark">{item.product.nombre}</p>
                <p className="text-xs text-text-dark/60">$ {item.product.precio.toLocaleString('es-CL')} c/u</p>
              </div>
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-red-600 hover:text-red-700"
                aria-label="Eliminar producto"
              >
                <FaTrash />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  className="px-3 py-1 rounded bg-chocolate text-cream"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <span className="font-semibold w-6 text-center">{item.quantity}</span>
                <button
                  className="px-3 py-1 rounded bg-chocolate text-cream"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
              <span className="font-semibold text-chocolate">
                $ {item.subtotal.toLocaleString('es-CL')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-lg font-bold text-chocolate">
          <span>Total</span>
          <span>$ {total.toLocaleString('es-CL')}</span>
        </div>
        <button
          onClick={handleSendOrder}
          className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
        >
          <FaWhatsapp />
          <span>Enviar pedido por WhatsApp</span>
        </button>
        {error && <p className="text-sm text-red-700 bg-red-50 p-2 rounded">{error}</p>}
      </div>
    </aside>
  );
};

export default Cart;
