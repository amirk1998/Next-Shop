import { getProducts, getProductsBySlug } from '@/services/productService';

export const dynamic = 'force-static';
export const dynamicParams = false;

const ProductsDetail = async ({ params }) => {
  const { slug } = params;
  const { product } = await getProductsBySlug(slug);
  return (
    <div>
      <h1 className='mb-6 text-2xl font-bold'>{product.title}</h1>
      <p className='mb-6'>{product.description}</p>
      <p className='mb-6'>
        قیمت محصول
        <span className={`${product.discount ? 'line-through' : 'font-bold'}`}>
          {product.price}
        </span>
      </p>
      {!!product.discount && (
        <div className='mb-6 flex items-center gap-x-2'>
          <p className='text-xl font-bold'>
            قیمت با تخفیف : {product.offPrice}
          </p>
          <div className='rounded-xl bg-rose-500 px-2 py-0.5 text-sm text-white'>
            {product.discount} %
          </div>
        </div>
      )}
      <div>
        <button className='btn btn--primary'> اضافه کردن به سبد خرید </button>
      </div>
    </div>
  );
};

export default ProductsDetail;

export async function generateStaticParams() {
  const { products } = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}
