export default {
  responseMsg(code, msg) {
    if (msg) {
      if (code == 1) {
        window.$message.error(msg);
      }
    }
  },
};
