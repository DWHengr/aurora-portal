export default {
  responseMsg(code, msg) {
    if (msg) {
      if (code == 1) {
        window.$message.error(msg);
      }
      if (code == -3) {
        sessionStorage.removeItem('Aurora-Token');
        window.$message.error('认证失效，请重新登录');
      }
    }
  },
};
