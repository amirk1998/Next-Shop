import http from './httpService';

export function getOTP(data) {
  return http.post('/user/get-otp', data).then(({ data }) => data.data);
}
