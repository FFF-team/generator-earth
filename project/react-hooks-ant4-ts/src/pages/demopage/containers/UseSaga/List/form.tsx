import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Input, Button, Select, Form, DatePicker } from 'antd'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'

import { IReducerProps } from './reducers'
import { IActionProps } from './actions'


type IFormProps4List = RouteComponentProps & IReducerProps & IActionProps

const { RangePicker } = DatePicker;


export default withRouter(class extends BaseContainer<IFormProps4List> {

    async componentDidMount() {
        // item或add页面使用props.history.push(`${this.context.CONTAINER_ROUTE_PREFIX}/list`)
        // 跳转到本页面时，使用store中的formData拉取新的tableData
        if (this.props.history && this.props.history.action === 'PUSH') {
            if (this.props.submitFormAsync && this.props.formData) {
                let r = await this.props.submitFormAsync(this.props.formData)
                console.log('update done! result is: ', r)
            }
        }
    }


    /**
     * 提交表单
     */
    submitForm = async (values) => {
        // 重置table
        // this.props.resetTable && this.props.resetTable()

        // 提交表单最好新一个事务，不受其他事务影响
        await this.sleep()

        // action
        this.props.submitFormAsync && this.props.submitFormAsync(values)
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
})
