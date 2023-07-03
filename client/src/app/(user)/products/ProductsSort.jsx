'use client';

import RadioInput from '@/common/RadioInput';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const sortOptions = [
  { id: 1, value: 'latest', label: 'جدیدترین' },
  { id: 2, value: 'earliest', label: 'قدیمی ترین' },
  { id: 3, value: 'popular', label: 'محبوب ترین' },
];

const ProductsSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState('');

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handlerSort = (e) => {
    const value = e.target.value;
    setSort(value);
    router.push(pathname + '?' + createQueryString('sort', value));
  };

  useEffect(() => {
    setSort(searchParams.get('sort') || '');
  }, [searchParams]);

  return (
    <div>
      <p className='mb-2 text-lg font-bold'> مرتب سازی</p>
      <div className='space-y-1'>
        {sortOptions.map((item) => {
          return (
            <RadioInput
              key={item.id}
              id={item.id}
              label={item.label}
              value={item.value}
              name='product-sort'
              checked={sort === item.value}
              onChange={handlerSort}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductsSort;
