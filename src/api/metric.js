import Http from '@/utils/axios';

export default {
  page(param) {
    return Http.post('/api/v1/metric/page', param);
  },
  create(param) {
    return Http.post('/api/v1/metric/create', param);
  },
  deletes(param) {
    return Http.post('/api/v1/metric/deletes', param);
  },
  update(param) {
    return Http.post('/api/v1/metric/update', param);
  },
  all() {
    return Http.post('/api/v1/metric/all');
  },
};
