import Http from '@/utils/axios';

export default {
  page(param) {
    return Http.post('/api/v1/rule/page', param);
  },
  deletes(param) {
    return Http.post('/api/v1/rule/deletes', param);
  },
  create(param) {
    return Http.post('/api/v1/rule/create', param);
  },
  update(param) {
    return Http.post('/api/v1/rule/update', param);
  },
  details(param) {
    return Http.post('/api/v1/rule/details/' + param);
  },
};
