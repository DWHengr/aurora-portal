import Http from '@/utils/axios';

export default {
  login(param) {
    return Http.post('/login', param);
  },
};
