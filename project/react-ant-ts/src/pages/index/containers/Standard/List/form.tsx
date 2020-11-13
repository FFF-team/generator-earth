import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Input, Button, Select, Form, DatePicker } from 'antd'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'

import { IReducerProps } from './reducers'
import { IActionProps } from './actions'



type IFormProps4List = RouteComponentProps & IReducerProps & IActionProps



export default withRouter(class extends BaseContainer<IFormProps4List> {

    async componentDidMount() {
        // item或add页面使用props.history.push(`${this.context.CONTAINER_ROUTE_PREFIX}/list`)
        // 跳转到本页面时，使用store中的formData拉取新的tableData
        if (this.props.history && this.props.history.action === 'PUSH') {
            if (this.props.updateTable && this.props.formData) {
                let r = await this.props.updateTable(this.props.formData)
                console.log('update done! result is: ', r)
            }
        }
    }
    
    
    onFinish = async (values) => {
        // 重置table
        // this.props.resetTable && this.props.resetTable()

        // action
        this.props.updateTable && this.props.updateTable(values)
    }
    
    
    
    render() {
        return (
            <Form className="ui-background"
                    layout="inline"
                    onFinish={this.onFinish}
                    initialValues={this.props.formData}>
                
                <Form.Item name='assetCode' label={('编号')}>
                    <Input />
                </Form.Item>

                <Form.Item name='assetName' label={('名称')}>
                    <Input />
                </Form.Item>

                <Form.Item name='contract' label={('主体')}>
                    <Select style={{ width: 180 }}>
                        <Select.Option value="lucky">lucky</Select.Option>
                        <Select.Option value="dog">dog</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name='signDate' label={('时间')}>
                    <DatePicker.RangePicker format='YYYY年MM月DD HH:mm:ss' />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit"> 查询 </Button>
                </Form.Item>

            </Form>
        )
    }
})

