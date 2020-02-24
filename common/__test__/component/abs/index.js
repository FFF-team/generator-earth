class Abs {
  absTest = (num) => {
    return this.insideFun(num)
  }

  insideFun = (num) => {
    if (typeof num !== 'number') {
      throw new Error('参数类型错误');
    }
    return Math.abs(num);
  }
}

export default new Abs();