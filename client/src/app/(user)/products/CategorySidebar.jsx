'use client';
import ProductsFilter from './ProductsFilter';
import ProductsSort from './ProductsSort';

const CategorySidebar = ({ categories }) => {
  return (
    <div className='col-span-1 space-y-8'>
      <ProductsFilter categories={categories} />
      <ProductsSort />
    </div>
  );
};

export default CategorySidebar;
