export default {
  responseMsg(code, msg) {
    if (msg) {
      if (code == 0) {
        window.$message.success(msg);
      } else if (code == 1) {
        window.$message.error(msg);
      }
    }
  },
};
