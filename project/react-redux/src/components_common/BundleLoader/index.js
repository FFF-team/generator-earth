import React from 'react'
import PropTypes from 'prop-types'


/**
 *
 * @param Comp 需要异步的组件
 * @param props
 * @param LoadingComp Loading组件，不传则没有loading效果
 * @return {*}
 * @constructor
 */
const BundleLoader = (Comp, props, LoadingComp) => {
    return (
        <Bundle load={ Comp } loadingComp={ LoadingComp || null }>
            {(Mod) => (<Mod {...props}/>)}
        </Bundle>
    )
};

class Bundle extends React.PureComponent {

    static propTypes = {
        mod: PropTypes.node, // 异步加载的组件
        loadingComp : PropTypes.node  // loading组件
    };
    static defaultProps =  {
        mod: null,
        loadingComp: null
    };

    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    };

    componentDidMount() {

        this._isMounted = true;

        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    load(props) {
        this.setState({
            mod: null
        });

        /*
        *  this.props.load
        *  内部会将执行callback，传入require()后的组件
        *  经webpack boundle-loader包装的组件
        *
        * module.exports = function(cb) {
	require.ensure([], function(require) {
		cb(require("!!../../node_modules/babel-loader/lib/index.js??ref--1-oneOf-1!../../node_modules/eslint-loader/index.js??ref--0-0!./page2.js"));
	}, "page2");
}
        * */


        props.load().then((mod) => {
            this._isMounted && this.setState({
                mod: mod.default ? mod.default : mod
            });
        });

    }

    render() {

        return this.state.mod ? this.props.children(this.state.mod) : this.props.loadingComp
    }
}

export default BundleLoader
