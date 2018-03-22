class Servic {

  bFun() {
    console.log(__filename);
    return __filename;
  }
  async b2Fun() {
    return await (() =>
      new Promise((resolve, reject) => {
        // 自运行返回Promise
        setTimeout(() => {
          resolve(`async ${__filename}`);
        }, 500);
      }))();
  }
}

module.exports = Servic;
