import Http from '@/utils/axios';

export default {
  page(param) {
    return Http.post('/api/v1/user/page', param);
  },
  create(param) {
    return Http.post('/api/v1/user/create', param);
  },
  deletes(param) {
    return Http.post('/api/v1/user/deletes', param);
  },
  update(param) {
    return Http.post('/api/v1/user/update', param);
  },
  all() {
    return Http.post('/api/v1/user/all');
  },
};
