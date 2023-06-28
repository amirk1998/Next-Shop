import { getUserProfile } from '@/services/authServices';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = () =>
  useQuery({
    queryKey: ['get-user-profile'],
    queryFn: getUserProfile,
    retry: false,
    refetchOnWindowFocus: true,
  });
