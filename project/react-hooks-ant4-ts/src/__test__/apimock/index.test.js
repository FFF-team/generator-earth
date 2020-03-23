import React from 'react';
import ApiMock from '../component/apimock/index.js';

import { mount } from 'enzyme';

const getWrapper = (props = {}) => {
    const defaultProps = {};
    const currentProps = Object.assign({}, defaultProps, props);

    let wrapper = mount(<ApiMock {...currentProps} />);

    return {
        wrapper,
        currentProps
    };
};


const list = {data: [{'label': '北京', 'value': '1111'}], rCode: 0}

describe('apimock', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(list));
  })

  it('test', async() => {
    const { wrapper } = getWrapper({});
    await new Promise(resolve => setImmediate(resolve));
  })
})
