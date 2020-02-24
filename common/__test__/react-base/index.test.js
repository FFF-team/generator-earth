import React from 'react';

import ReactBase from '../component/reactBase/index';
import { mount } from 'enzyme';

const getWrapper = (props = {}) => {
    const defaultProps = {};
    const currentProps = Object.assign({}, defaultProps, props);

    let wrapper = mount(<ReactBase {...currentProps} />);

    return {
        wrapper,
        currentProps
    };
};

/* 
    1.是否正常渲染
    2.测试分支渲染
    3.测试props传递
    4.测试事件触发
    5.测试函数调用
 */

describe('测试reactBase', () => {
    it('测试正常渲染', () => {
        const { wrapper } = getWrapper(); // 获取react组件
        expect(wrapper.find('.react-base')).toHaveLength(1); // 组件是否被正常渲染
    });

    it('测试 isModal 为true', () => {
         const props = {
            isModal: false,
        }
        const { wrapper } = getWrapper(props);
        expect(wrapper.find('.not-modal')).toHaveLength(1); // 是否有 not-modal class存在
        expect(wrapper.find('.is-modal')).toHaveLength(0); // 是否有 is-modal 存在
    });

    it('测试 props 传递', () => {
        const props = {
            className: 'classname',
            isModal: true
        }
        const { wrapper } = getWrapper(props);
        expect(wrapper.find('.is-modal.classname')).toHaveLength(1); // 主要看 props中 className 属性是否在组件中正确赋值上。
    })

    it('测试事件触发', () => {
        const props = {
            className: 'classname',
            isModal: true,
            onClick: jest.fn()
        }
        const { wrapper } = getWrapper(props);

        const handleTestClickSpy = jest.spyOn(wrapper.instance(), 'test'); // 劫持 组件中 test方法  wrapper.instance() 是一个组件实例

        const reactBase = wrapper.find('.react-base'); // 找到对应的dom
        reactBase.invoke('onClick')(); // 触发注册在该dom上的 onClick方法
 
        expect(wrapper.state().click).toBe(true); // onClick事件触发后会改变state中的属性， 验证是否改变state成功
        expect(handleTestClickSpy).toHaveBeenCalled(); // onClick 事件触发后会调用组件中的test方法，验证test方式是否被调用
        expect(props.onClick).toHaveBeenCalled(); // onClick 事件触发后会调用props 中的onClick方法，验证props 中的onClick方式是否被调用
        expect(props.onClick.mock.calls[0][0]).toBe(props.className); // 验证props onClick方法第一次调用的第一个参数
    })

    it('测试函数调用', () => {
        const props = {
            className: 'classname',
            isModal: true,
            onClick: jest.fn()
        }

        const { wrapper } = getWrapper(props);

        const handleTestClickSpy = jest.spyOn(wrapper.instance(), 'test'); 

        wrapper.instance().test(); // 直接调用组件实例中的test方法

        expect(handleTestClickSpy).toHaveBeenCalled(); // 验证test方法是否被调用
        expect(wrapper.state().testCalled).toBe(true); // 验证test方法设置的state是否生效
        wrapper.update();
        expect(wrapper.find('.called')).toHaveLength(1); // 验证test方法设置的state后更新渲染是否正常
    })
})
