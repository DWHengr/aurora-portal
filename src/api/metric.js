import Http from '@/utils/axios';

export default {
  page(param) {
    return Http.post('/api/v1/metric/page', param);
  },
};
