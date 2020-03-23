import React from 'react'
import moment from 'moment'
import { RouteComponentProps } from 'react-router-dom'
import { DatePicker, Button, Form, Input } from 'antd'
import { FormInstance } from 'antd/lib/form'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'
import request from 'ROOT_SOURCE/utils/request'
import Rules from 'ROOT_SOURCE/utils/validateRules'


type IFormProps4Item = RouteComponentProps<{id?: string}>


export default class extends BaseContainer<IFormProps4Item> {

    formRef = React.createRef<FormInstance>();

    /**
     * 提交表单
     */
    submitForm = async (values: object) => {

        // 提交表单最好新起一个事务，不受其他事务影响
        await this.sleep()

        // 提交请求
        await request.post('/asset/updateAsset', values)

        // 提交后返回list页
        this.props.history.push(`${this.context.CONTAINER_ROUTE_PREFIX}/list`)
    }

    async componentDidMount() {
        let { data } = await request.get('/asset/viewAsset', {id: this.props.match.params.id /*itemId*/})
        if (this.formRef.current) {
            this.formRef.current.setFieldsValue({
                ...data,
                contractDate: data.contractDate ? moment(data.contractDate) : undefined,
            });
        }
    }

    render() {
        return (
            <div className="ui-background">
                <Form ref={this.formRef} onFinish={this.submitForm}>

                    <Form.Item name='id' noStyle>
                        <Input type='hidden' />
                    </Form.Item>

                    <Form.Item name='assetName' label='资产方名称' rules={[{ required: true }]}>
                        <Input disabled />
                    </Form.Item>

                    <Form.Item name='contract' label='签约主体' rules={[{ required: true }]}>
                        <Input disabled />
                    </Form.Item>

                    <Form.Item name='contractDate' label='签约时间' rules={[{ required: true }]}>
                        <DatePicker />
                    </Form.Item>

                    <Form.Item name='contacts' label='联系人'>
                        <Input />
                    </Form.Item>

                    <Form.Item name='contactsPhone' label='联系电话' rules={[{ pattern: Rules.phone, message: '无效' }]}>
                        <Input maxLength={11} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit"> 提交 </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" onClick={e=>window.history.back()}> 取消/返回 </Button>
                    </Form.Item>

                </Form>
            </div>
        )

    }
}
