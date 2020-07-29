import * as React from 'react';
import * as PropTypes from 'prop-types';

/**
 * copy from https://segmentfault.com/a/1190000009539836
 */
class AsyncBundle extends React.Component<any> {
    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    }

    componentWillMount() {
        // 加载初始状态
        this.load(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    }

    load(props) {
        // 重置状态
        this.setState({
            mod: null
        });
        // 传入组件的组件
        props.load().then((mod) => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            });
        });
    }

    render() {
        const child: Function = this.props.children ? this.props.children as Function : () => null;

        // if state mode not undefined,The container will render children
        return this.state.mod ? child(this.state.mod) : null;
    }
}

AsyncBundle['propTypes'] = {
    load: PropTypes.func,
    children: PropTypes.func.isRequired
};


export default AsyncBundle;
