import Http from '@/utils/axios';

export default {
  create(param) {
    return Http.post('/api/v1/usergroup/create', param);
  },
  page(param) {
    return Http.post('/api/v1/usergroup/page', param);
  },
};
