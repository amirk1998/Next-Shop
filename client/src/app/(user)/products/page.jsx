import { getCategories } from '@/services/categoryService';
import { getProducts } from '@/services/productService';
import CategorySidebar from './CategorySidebar';
import queryString from 'query-string';
export const dynamic = 'force-dynamic';

const ProductsPage = async ({ params, searchParams }) => {
  const { products } = await getProducts(queryString.stringify(searchParams));
  const { categories } = await getCategories();

  return (
    <div>
      <h1 className='mb-6 text-2xl font-bold'>صفحه محصولات </h1>
      <div className='grid grid-cols-4'>
        <CategorySidebar categories={categories} />
        <div className='col-span-3 grid grid-cols-3 gap-4'>
          {products.map((product) => {
            return (
              <div
                className='col-span-1 rounded-xl border p-4 shadow-md'
                key={product._id}
              >
                <h2 className='font-bold'>{product.title}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
