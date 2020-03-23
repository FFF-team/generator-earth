import React from 'react';
import { mount, render, shallow } from 'enzyme';
import Deep from '../component/deep/index.js';

/* 
  测试 mount shallow  render 触发事件
  render 方式不能触发事件， 如验证 可将注释打开
 */

describe('deep', () => {
  it('测试mount 触发事件', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Deep onClick={onClick}/>);

    expect(wrapper.find('.index')).toHaveLength(1)

    wrapper.find('.index').invoke('onClick')();
    expect(onClick).toHaveBeenCalled();
	});

  it('测试shallow 触发事件', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Deep onClick={onClick}/>);

    wrapper.find('.index').invoke('onClick')();
    expect(onClick).toHaveBeenCalled();
  });

  /* it('测试render 触发事件', () => {
    const onClick = jest.fn();
    const wrapper = render(<Deep onClick={onClick}/>);

    wrapper.find('.index').invoke('onClick')();
    expect(onClick).toHaveBeenCalled(1);
  }); */
})