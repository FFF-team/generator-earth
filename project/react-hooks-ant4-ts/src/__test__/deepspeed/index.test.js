import React from 'react';
import { mount, render, shallow } from 'enzyme';
import Deep from '../component/deep/index.js';

describe('deep', () => {
  it('测试mount渲染', () => {
    for(let i = 0; i < 500; i++) {
      const wrapper = mount(<Deep />);
      wrapper.find('.c')
    }
	});

  it('测试shallow渲染', () => {
     for(let i = 0; i < 500; i++) {
      const wrapper = shallow(<Deep />);
      wrapper.find('.c')
    }
  });

  it('测试render渲染', () => {
    for(let i = 0; i < 500; i++) {
      const wrapper = render(<Deep />);
      wrapper.find('.c')
    }
  });
})