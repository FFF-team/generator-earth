import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Input, Button, Select, Form, DatePicker } from 'antd'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'



type IFormProps4List = RouteComponentProps & {
    updateTable: Function,
}



export default class extends BaseContainer<IFormProps4List> {
    

    onFinish = async (values: any) => {
        
        if (values.signDate) {
            values.startDate = values.signDate[0].format('YYYY-MM-DD HH:mm:ss');
            values.endDate = values.signDate[1].format('YYYY-MM-DD HH:mm:ss');
        }
        
        delete values.signDate;

        await this.sleep();

        // action
        this.props.updateTable && this.props.updateTable(values);
    }
    
    
    
    render() {
        return (
            <Form className="ui-background" layout="inline" onFinish={this.onFinish}>
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
}

