import { getCategories } from '@/services/categoryService';
import { getProducts } from '@/services/productService';
import CategorySidebar from './CategorySidebar';
import queryString from 'query-string';
import { toLocalDateStringShort } from '@/utils/toLocalDate';
import Link from 'next/link';
import { cookies } from 'next/headers';
import AddToCart from './[slug]/AddToCart';
import LikeProduct from './LikeProduct';
import { toStringCookies } from '@/utils/toStringCookies';
export const dynamic = 'force-dynamic';

const ProductsPage = async ({ params, searchParams }) => {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);
  const { products } = await getProducts(
    queryString.stringify(searchParams),
    strCookies
  );
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
                <div className='flex items-center justify-between'>
                  <h2 className='mb-4 text-xl font-bold'>{product.title}</h2>
                  <LikeProduct product={product} />
                </div>
                <div className='mb-4'>
                  <span>تاریخ ساختن : </span>
                  <span className='font-bold'>
                    {toLocalDateStringShort(product.createdAt)}
                  </span>
                </div>

                <Link
                  className='font-bold text-primary-900'
                  href={`/products/${product.slug}`}
                >
                  مشاهده محصول
                </Link>

                <div className='mt-4'>
                  <AddToCart product={product} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
