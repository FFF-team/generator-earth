import React, { FormEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Input, Button, Select, Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'
import { mapMoment } from 'ROOT_SOURCE/utils/fieldFormatter'
import DateRangePicker from 'ROOT_SOURCE/components/DateRangePicker'


type IFormProps4List = RouteComponentProps & FormComponentProps & {
    updateTable: Function,
}


export default Form.create<IFormProps4List>()(
    class extends BaseContainer<IFormProps4List> {
    
    /**
     * 提交表单
     */
    submitForm = async (e: FormEvent) => {
        e && e.preventDefault && e.preventDefault()

        // 重置table
        // this.props.resetTable && this.props.resetTable()

        // 提交表单最好新一个事务，不受其他事务影响
        await this.sleep()

        // 获取表单数据
        let _formData = { ...this.props.form.getFieldsValue() }

        // _formData里的一些值需要适配
        _formData = mapMoment(_formData, 'YYYY-MM-DD HH:mm:ss') as typeof _formData
        
        // action
        this.props.updateTable && this.props.updateTable(_formData)
    }
    
    
    
    render() {
        let { form } = this.props
        let { getFieldDecorator } = form
        
        return (
            <div className="ui-background">
                <Form layout="inline" onSubmit={this.submitForm}>
           
                    <Form.Item label={('资产方编号')}>
                        {getFieldDecorator('assetCode', {initialValue: ''})(<Input />)}
                    </Form.Item>
        
                    <Form.Item label={('资产方名称')}>
                        {getFieldDecorator('assetName', {initialValue: ''})(<Input />)}
                    </Form.Item>
        
                    <Form.Item label={('签约主体')}>
                        {getFieldDecorator('contract', {initialValue: ''})(
                            <Select style={{ width: 180 }}>
                                <Select.Option value="lucky">lucky</Select.Option>
                                <Select.Option value="dog">dog</Select.Option>
                            </Select>)
                        }
                    </Form.Item>
                    
                    <Form.Item label={('签约时间')}>
                        <DateRangePicker
                            dateShowFormat='YYYY年MM月DD HH:mm:ss'
                            form={form}
                            startVal={undefined}
                            startKey='startDate'
                            endVal={undefined}
                            endKey='endDate'
                        />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit"> 查询 </Button>
                    </Form.Item>
            
                </Form>
            </div>
            
        )
    }
} )

