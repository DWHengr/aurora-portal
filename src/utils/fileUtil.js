export default {
  fileToJson(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (res) => {
        const { result } = res.target; // 得到字符串
        const data = JSON.parse(result); // 解析成json对象
        resolve(data);
      }; // 成功回调
      reader.onerror = (err) => {
        reject(err);
      }; // 失败回调
      reader.readAsText(new Blob([file]), 'utf-8'); // 按照utf-8编码解析
    });
  },
  download(res, fileName) {
    if (res.headers['content-type'] != 'application/json;charset=UTF-8') {
      let blob = new Blob([res.data]);
      let downloadElement = document.createElement('a');
      let href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      downloadElement.download = fileName; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象
    }
  },
  download2(res, fileName) {
    let blob = new Blob([res], { type: 'application/octet-stream' });
    let downloadElement = document.createElement('a');
    let href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = fileName; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
  },
};
