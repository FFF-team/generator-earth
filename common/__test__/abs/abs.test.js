import Abs from '../component/abs';

describe('test1', () => { 
  it('测试1', () => { //黑盒
    expect(Abs.absTest(10)).toEqual(10); // 判断 输入是10 输出是10
    expect(Abs.absTest(10.5)).toEqual(10.5); 
    expect(Abs.absTest(-1)).toEqual(1);
    expect(Abs.absTest(-1.3)).toEqual(1.3);
    expect(Abs.absTest(0)).toEqual(0);
    const testThrow = () => {
      Abs.absTest([]);
    }

    expect(testThrow).toThrow(); // 判断是否抛出错误。
    expect(testThrow).toThrow('参数类型错误');
  });

  it('测试2', () => {
    const insideFun = jest.spyOn(Abs, 'insideFun');

    expect(Abs.absTest(10)).toEqual(10);
    expect(Abs.absTest(10.5)).toEqual(10.5);
    expect(Abs.absTest(-1)).toEqual(1);
    expect(Abs.absTest(-1.3)).toEqual(1.3);
    expect(Abs.absTest(0)).toEqual(0);
    const testThrow = () => {
      Abs.absTest([]);
    }
    
    expect(testThrow).toThrow();
    expect(testThrow).toThrow('参数类型错误');
    
    expect(insideFun).toHaveBeenCalled();
    expect(insideFun).toHaveBeenCalledTimes(7);
  })
})