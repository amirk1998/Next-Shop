import http from './httpService';

export function getCategories() {
  return http.get('/category/list').then(({ data }) => data.data);
}

export function getCategoryById(id) {
  return http.get(`/category/${id}`).then(({ data }) => data.data);
}

//Admin Related Functions
export function addCategory(data) {
  return http.post(`/admin/category/add`, data).then(({ data }) => data.data);
}

export function updateCategory({ categoryId, data }) {
  return http
    .patch(`/admin/category/update/${categoryId}`, data)
    .then(({ data }) => data.data);
}
