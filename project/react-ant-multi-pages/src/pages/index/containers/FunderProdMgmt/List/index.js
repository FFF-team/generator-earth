import React, { Component } from 'react'
import { Form, Button } from 'antd'
import { Link } from 'react-router-dom'

import F from './form'
import T from './table'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'
import request from 'ROOT_SOURCE/utils/request'
import { CURRENT_PAGE, PAGE_SIZE, RESPONSE_DESTRUST_KEY, RESPONSE_LIST_DESTRUST_KEY } from 'ROOT_SOURCE/base/BaseConfig'

import { mapMoment } from 'ROOT_SOURCE/utils/fieldFormatter'


export default class extends BaseContainer {
    
    constructor(props) {
        super(props)
        
        this.state = {
            formData: {
                assetCode: undefined,
                assetName: undefined,
                contract: undefined,
                startDate: undefined,
                endDate: undefined,
            },
            tableData: {
                dataSource: [],
            },
        }
        
        this.submitForm = this.submitForm.bind(this)
    }
    
    
    
    async submitForm(_formData) {
        
        let result = await request['post']('/asset/getAsset', {..._formData})
        
        if (!result) { return; }
        
        // 解构server结果
        let resultBody = result[RESPONSE_DESTRUST_KEY]
        
        if (!resultBody) { return; }
        
        // 更新table
        this.setState({
            tableData: {
                dataSource: resultBody[RESPONSE_LIST_DESTRUST_KEY],
            },
        })
    }
    
    
    
    render() {
        
        return (
            <section>
                <table style={{border: '1px solid blue'}}>
                    <i>本demo(无分页)未使用redux; 需要使用redux的话,请最好使用框架</i>
                </table>
                
                <Link to={`${this.context.CONTAINER_ROUTE_PREFIX}/add`}>
                    <Button type="primary" style={{marginTop: '12px'}}>新增</Button>
                </Link>
                <F {...this.state.formData} submitForm={this.submitForm} />
                <T {...this.state.tableData} />
            </section>
        )
    }
}
