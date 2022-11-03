import Http from '@/utils/axios';

export default {
  page(param) {
    return Http.post('/api/v1/rule/page', param);
  },
  deletes(param) {
    return Http.post('/api/v1/rule/deletes', param);
  },
};