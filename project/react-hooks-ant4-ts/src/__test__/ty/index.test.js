import React from 'react';
import Files from '../component/ty/index';
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


describe('files', () => {
  it('test1', async() => {
    const props = {
        isModal: false
    }
    const { wrapper } = getWrapper(props);
    expect(wrapper.find('.ty')).toHaveLength(1);

  })
})