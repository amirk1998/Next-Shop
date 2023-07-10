import { getCoupons } from '@/services/couponService';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetCoupons = () =>
  useQuery({
    queryKey: ['get-coupons'],
    queryFn: getCoupons,
    retry: false,
    refetchOnWindowFocus: true,
  });
