import React from 'react';
import Files from '../component/files/index.js';
import { mount } from 'enzyme';

const getWrapper = (props = {}) => {
    const defaultProps = {};
    const currentProps = Object.assign({}, defaultProps, props);

    let wrapper = mount(<Files {...currentProps} />);

    return {
        wrapper,
        currentProps
    };
};

jest.mock('lodash', () => {
  return {
      forEach: ((arr, cb) => {
        for(let i = 0; i < arr.length; i++) {
          cb(100)
        }
      })
  }
});

describe('files', () => {
  it('test', async() => {
    const { wrapper } = getWrapper({});
  })
})