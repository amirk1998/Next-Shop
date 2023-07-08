import { getProducts } from '@/services/productService';
import { useQuery } from '@tanstack/react-query';

export const useGetProducts = () =>
  useQuery({
    queryKey: ['get-products'],
    queryFn: getProducts,
    retry: false,
    refetchOnWindowFocus: true,
  });
