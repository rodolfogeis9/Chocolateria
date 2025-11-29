import { products } from '../config/products';
import ProductCard from './ProductCard';

const ProductList = () => {
  const chocolates = products.filter((p) => p.categoria === 'chocolate');
  const alfajores = products.filter((p) => p.categoria === 'alfajor');

  return (
    <section id="productos" className="py-16 section-container">
      <div className="flex flex-col lg:flex-row lg:items-start gap-10">
        <div className="flex-1 space-y-10">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-chocolate">Chocolates</h2>
              <span className="badge">Gramajes clásicos</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chocolates.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-chocolate">Alfajores</h2>
              <span className="badge">Cajas listas para compartir</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {alfajores.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
