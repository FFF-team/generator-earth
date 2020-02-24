import React, { Component } from 'react'

import request from 'ROOT_SOURCE/utils/request'
import { Table } from 'antd'


/**
 * Independent, high-cohesion, one-time table container
 *     not for redux (action/reducer)
 *     not for react-update-lifecycle
 * 
 * Better used by high-order function(decorator),
 * rahter than mixin/extended
 */

export default class extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            // initialized/loading
            dataSource: undefined
        }
    }
    
    
    componentDidMount() {
        request
            .get(this.props.queryUrl, this.props.queryParams)
            .then(result => {
                if ( !result.body ||
                     !result.body.pageResult ||
                     !result.body.pageResult.rows ||
                     !result.body.pageResult.rows.length ) {
                    this.setState({
                        // no-data
                        dataSource: null
                    })
                } else {
                    this.setState({
                        // has-data
                        dataSource: result.body.pageResult.rows
                    })
                }
            })
    }
    
    
    render() {
        // case has-data
        if (this.state.dataSource) {
            return (<Table {...this.props.tableOptions} dataSource={this.state.dataSource} />)
        // case no-data
        } else if (this.state.dataSource === null) {
            return this.props.nodataComp || null
        // case loading
        } else if (this.state.dataSource === undefined) {
            return this.props.loadingComp || null
        }
        
    }
}