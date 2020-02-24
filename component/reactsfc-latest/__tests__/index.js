import React from 'react';
import <%= upperCaseName %> from '../src';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

const { shallow, render, mount } = Enzyme;
/*
 * 测试点（渲染，初始化，交互）
 * 1.render结构是否正常
 * 2.检查点击事件，反馈是否正常
 */

let onClick = sinon.spy();
const component = <<%= upperCaseName %> />;
describe('Test <%= upperCaseName %>', () => {

    it('render the state', () => {

        const wrapper = shallow(component);
        const wrapperClass = wrapper.find('div');

        expect(wrapperClass.length >= 1);

    })

})
