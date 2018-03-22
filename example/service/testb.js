class Servic {
  bFun() {
    console.log(__filename);
    return __filename;
  }
  async b2Fun() {
    const re = await this.ctx.service.testa.testd.b2Fun()
    console.log(__filename, 'log out:' , re)
    return await (() =>
      new Promise((resolve, reject) => {
        // 自运行返回Promise
        setTimeout(() => {
          resolve(`async ${__filename}`);
        }, 100);
      }))();
  }
}

module.exports = Servic;
