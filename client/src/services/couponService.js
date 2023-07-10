import http from './httpService';

//Admin Related Functions
export function getCoupons() {
  return http.get('/admin/coupon/list').then(({ data }) => data.data);
}
