export type ProductCategory = 'chocolate' | 'alfajor';

export type Product = {
  id: string;
  categoria: ProductCategory;
  nombre: string;
  descripcion: string;
  tipoMedida: 'gramos' | 'unidades';
  cantidad: number;
  precio: number;
  imageUrl: string;
};
