import Http from '@/utils/axios';

export default {
  create(param) {
    return Http.post('/api/v1/usergroup/create', param);
  },
  page(param) {
    return Http.post('/api/v1/usergroup/page', param);
  },
  update(param) {
    return Http.post('/api/v1/usergroup/update', param);
  },
  deletes(param) {
    return Http.post('/api/v1/usergroup/deletes', param);
  },
  all() {
    return Http.post('/api/v1/usergroup/all');
  },
};
