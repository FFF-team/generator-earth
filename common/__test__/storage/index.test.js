import React from 'react';
import Storage from '../component/storage/index.js';
import { mount } from 'enzyme';

const getWrapper = (props = {}) => {
    const defaultProps = {};
    const currentProps = Object.assign({}, defaultProps, props);

    let wrapper = mount(<Storage {...currentProps} />);

    return {
        wrapper,
        currentProps
    };
};

const list = {data: [{'label': '北京', 'value': '1111'}], rCode: 0}

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  })

  it('test', async() => {
    const { wrapper } = getWrapper({});
    await new Promise(resolve => setImmediate(resolve));
    expect(localStorage.__STORE__['name']).toBe('wang');
    expect(sessionStorage.__STORE__['age']).toBe('18');
  })
})