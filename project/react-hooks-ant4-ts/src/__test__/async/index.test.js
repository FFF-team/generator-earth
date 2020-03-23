
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('peanut butter');
    }, 1000);
  })
}

describe('async', () => {
  it('test', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
  })  

  it('test2', done => {
    fetchData().then((data) => {
      expect(data).toBe('peanut butter');
      done();
    })
  })
})