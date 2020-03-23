import fun from '../component/ty/fun';

describe('test typescript', () => {
  it('test,', () => {
    expect(fun('namename', 19)).toEqual({ name: 'namename', age: 19 });
  })
})