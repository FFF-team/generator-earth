import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import { FormInstance } from 'antd/lib/form'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'
import request from 'ROOT_SOURCE/utils/request'
import Rules from 'ROOT_SOURCE/utils/validateRules'



export default class extends BaseContainer<RouteComponentProps<{id?: string}>> {

    
    formRef = React.createRef<FormInstance>();

    
    onFinish = async (values: object) => {

        await this.sleep()

        // 提交请求
        await request.post('/asset/updateAsset', values)

        // 提交后返回list页
        this.props.history.push(`${this.context.CONTAINER_ROUTE_PREFIX}/list`)
    }


    async componentDidMount() {
        let { data } = await request.get('/asset/viewAsset', {
            id: this.props.match.params.id, /*itemId*/ 
        });

        // 设置表单
        this.formRef.current && this.formRef.current.setFieldsValue(data);
    }


    render() {
        return (
            <Form className="ui-background" ref={this.formRef} onFinish={this.onFinish}>

                <Form.Item name='id' noStyle>
                    <Input type='hidden' />
                </Form.Item>

                <Form.Item name='assetName' label='资产方名称' rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>

                <Form.Item name='contract' label='签约主体'>
                    <Input />
                </Form.Item>

                <Form.Item name='contactsPhone' label='联系电话' 
                            rules={[{ required: true, pattern: Rules.phone, message: '无效' }]}>
                    <Input maxLength={11} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit"> 提交 </Button>
                    &nbsp;&nbsp;
                    <Button type="primary" onClick={e => window.history.back()}> 取消/返回 </Button>
                </Form.Item>

            </Form>
        )

    }
}
