import React from 'react'
import { Form } from 'antd'

import BaseContainer from './BaseContainer'


export default class extends BaseContainer {
    
    /**
     * 提交表单
     * @override
     */
    submitForm = (e) => {
        e && e.preventDefault()
        
        // 重置table
        this.props.resetTable && this.props.resetTable()
        
        // 提交表单最好新一个事务，不受其他事务影响
        setTimeout( () => {
            let _formData = { ...this.props.form.getFieldsValue() }
            
            // _formData里的一些值需要适配
            _formData = this.adaptFormData(_formData)
            
            // action
            this.props.updateTable && this.props.updateTable(_formData)
        }, 0 )
    }
    
    
    /**
     * this.props.formData里的一些值需要适配
     * @override
     */
    adaptFormData(formData) {
        return formData
    }
    
    
    /**
     * 包裹表单项
     */
    wrapItems(items) {
        return (
            <div className="ui-background">
                <Form layout="inline" onSubmit={this.submitForm}>
                {items}
                </Form>
            </div>
        )
    }
    
}
