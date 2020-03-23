import React from 'react'
import { Input, Button, Select, Form, DatePicker } from 'antd'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'


interface IFormProps4List {
    updateTable: (params?: any) => Promise<any>;
}


const { RangePicker } = DatePicker;


export default class extends BaseContainer<IFormProps4List> {

    /**
     * 提交表单
     */
    submitForm = async (values) => {
        // 重置table
        // this.props.resetTable && this.props.resetTable()

        // 提交表单最好新一个事务，不受其他事务影响
        await this.sleep()

        // action
        this.props.updateTable && this.props.updateTable(values)
    }


    render() {

        return (
            <div className="ui-background">
                <Form layout="inline" onFinish={this.submitForm}>
                    <Form.Item name='assetCode' label={('资产方编号')}>
                        <Input />
                    </Form.Item>

                    <Form.Item name='assetName' label={('资产方名称')}>
                        <Input />
                    </Form.Item>

                    <Form.Item name='contract' label={('签约主体')}>
                        <Select style={{ width: 180 }}>
                            <Select.Option value="lucky">lucky</Select.Option>
                            <Select.Option value="dog">dog</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name='signDate' label={('签约时间')}>
                        <RangePicker format='YYYY年MM月DD HH:mm:ss' />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit"> 查询 </Button>
                    </Form.Item>

                </Form>
            </div>

        )
    }
}

