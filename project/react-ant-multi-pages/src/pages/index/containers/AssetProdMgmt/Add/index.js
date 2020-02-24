import React from 'react'
import moment from 'moment'
import { DatePicker, Button, Form, Input, Col } from 'antd'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'

import request from 'ROOT_SOURCE/utils/request'
import { mapMoment } from 'ROOT_SOURCE/utils/fieldFormatter'
import Rules from 'ROOT_SOURCE/utils/validateRules'

const FormItem = Form.Item


export default Form.create()(class extends BaseContainer {
    
    /**
     * 提交表单
     */
    submitForm = (e) => {
        
        e && e.preventDefault()
        
        const { form } = this.props
        
        form.validateFieldsAndScroll(async (err, values) => {
            if (err) {
                return;
            }
            
            // 提交表单最好新一个事务，不受其他事务影响
            await this.sleep()
            
            let _formData = { ...form.getFieldsValue() }
            
            // _formData里的一些值需要适配
            _formData = mapMoment(_formData, 'YYYY-MM-DD HH:mm:ss')
            
            // action
            await request.post('/asset/addAsset', _formData)
                
            // 提交后返回list页
            this.props.history.push(`${this.context.CONTAINER_ROUTE_PREFIX}/list`)
        })
    }
    
    
    
    render() {
        
        let { form } = this.props
        let { getFieldDecorator } = form
        
        return (
            <div className="ui-background">
                <Form layout="inline" onSubmit={this.submitForm}>
                    
                    <FormItem label="资产方名称">
                        {getFieldDecorator('assetName', {
                            rules: [{ required: true }]
                        })(<Input/>)}
                    </FormItem>
                    
                    <FormItem label="签约主体">
                        {getFieldDecorator('contract', {
                            rules: [{ required: true }]
                        })(<Input/>)}
                    </FormItem>
                    
                    <FormItem label="签约时间">
                        {getFieldDecorator('contractDate', {
                            rules: [{ type: 'object', required: true }]
                        })(<DatePicker showTime format='YYYY年MM月DD HH:mm:ss' style={{ width: '100%' }}/>)}
                    </FormItem>
                    
                    <FormItem label="联系人">
                        {getFieldDecorator('contacts')(<Input/>)}
                    </FormItem>
                    
                    <FormItem label="联系电话" hasFeedback>
                        {getFieldDecorator('contactsPhone', {
                            rules: [{ pattern: Rules.phone, message: '无效' }]
                        })(<Input maxLength="11"/>)}
                    </FormItem>
                    
                    <FormItem>
                        <Button type="primary" htmlType="submit"> 提交 </Button>
                    </FormItem>
                    
                    <FormItem>
                        <Button type="primary" onClick={e => window.history.back()}> 取消/返回 </Button>
                    </FormItem>
                
                </Form>
            </div>
        
        )
        
    }
})

