export default {
  responseMsg(code, msg) {
    // eslint-disable-next-line no-console
    console.log(1);
    if (msg) {
      if (code == 1) {
        window.$message.error(msg);
        // eslint-disable-next-line no-console
        console.log(1);
      }
      if (code == -3) {
        sessionStorage.removeItem('Aurora-Token');
        window.$message.error('认证失效，请重新登录');
      }
    }
  },
};
