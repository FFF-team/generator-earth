import React, { FormEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { DatePicker, Button, Form, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'
import request from 'ROOT_SOURCE/utils/request'
import { mapMoment } from 'ROOT_SOURCE/utils/fieldFormatter'
import Rules from 'ROOT_SOURCE/utils/validateRules'


type IFormProps4Item = RouteComponentProps & FormComponentProps


export default Form.create<IFormProps4Item>()(
    class extends BaseContainer<IFormProps4Item> {
    
    /**
     * 提交表单
     */
    submitForm = (e: FormEvent) => {
        
        e && e.preventDefault()
        
        const { form } = this.props
        
        form.validateFieldsAndScroll(async (err, values) => {
            if (err) {
                return;
            }
            
            // 提交表单最好新一个事务，不受其他事务影响
            await this.sleep()
            
            // 获取表单数据
            let _formData = { ...form.getFieldsValue() }
            
            // _formData里的一些值需要适配
            _formData = mapMoment(_formData, 'YYYY-MM-DD HH:mm:ss') as typeof _formData
            
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
                    
                    <Form.Item label="资产方名称">
                        {getFieldDecorator('assetName', {
                            rules: [{ required: true }]
                        })(<Input/>)}
                    </Form.Item>
                    
                    <Form.Item label="签约主体">
                        {getFieldDecorator('contract', {
                            rules: [{ required: true }]
                        })(<Input/>)}
                    </Form.Item>
                    
                    <Form.Item label="签约时间">
                        {getFieldDecorator('contractDate', {
                            rules: [{ type: 'object', required: true }]
                        })(<DatePicker showTime format='YYYY年MM月DD HH:mm:ss' style={{ width: '100%' }}/>)}
                    </Form.Item>
                    
                    <Form.Item label="联系人">
                        {getFieldDecorator('contacts')(<Input/>)}
                    </Form.Item>
                    
                    <Form.Item label="联系电话" hasFeedback>
                        {getFieldDecorator('contactsPhone', {
                            rules: [{ pattern: Rules.phone, message: '无效' }]
                        })(<Input maxLength={11}/>)}
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit"> 提交 </Button>
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" onClick={e => window.history.back()}> 取消/返回 </Button>
                    </Form.Item>
                
                </Form>
            </div>
        
        )
        
    }
})

