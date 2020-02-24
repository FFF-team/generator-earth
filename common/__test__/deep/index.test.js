import React from 'react';
import { mount, render, shallow } from 'enzyme';
import Deep from '../component/deep/index.js';

/* 
  shallow 方式只能渲染最顶层组件，嵌套组件不渲染
  mount render 都可以拿到底层组件

  验证shallow 不渲染嵌套组件可将下方注释打开
 */

describe('deep', () => {
  it('测试mount渲染', () => {
    const wrapper = mount(<Deep />);
		expect(wrapper.find('.c')).toHaveLength(1);
	});

  /* it('测试shallow渲染', () => {
    const wrapper = shallow(<Deep />);
    expect(wrapper.find('.c')).toHaveLength(1);
  }); */

  it('测试render渲染', () => {
    const wrapper = render(<Deep />);
    expect(wrapper.find('.c')).toHaveLength(1);
  });
})