import Http from '@/utils/axios';

export default {
  page(param) {
    return Http.post('/api/v1/silence/page', param);
  },
  create(param) {
    return Http.post('/api/v1/silence/create', param);
  },
  deletes(param) {
    return Http.post('/api/v1/silence/deletes', param);
  },
  update(param) {
    return Http.post('/api/v1/silence/update', param);
  },
  all() {
    return Http.post('/api/v1/silence/all');
  },
};
