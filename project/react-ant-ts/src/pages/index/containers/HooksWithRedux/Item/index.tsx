import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Form, Input } from 'antd'

import { BaseContext } from 'ROOT_SOURCE/utils/context'
import request from 'ROOT_SOURCE/utils/request'
import Rules from 'ROOT_SOURCE/utils/validateRules'



export default function (props: RouteComponentProps<{id?: string}>) {

    const [form] = Form.useForm();

    const { CONTAINER_ROUTE_PREFIX } = useContext(BaseContext);


    const onFinish = async (values: object) => {
        // action
        await request.post('/asset/addAsset', values)

        // 提交后返回list页
        props.history.push(`${CONTAINER_ROUTE_PREFIX}/list`)
    };


    useEffect( ()=>{
        async function fetchData() {
            let { data } = await request.get('/asset/viewAsset', {
                id: props.match.params.id, /*itemId*/ 
            });
            
            // 设置表单
            form.setFieldsValue(data);
        }
        
        fetchData();
    }, []);


    return (
        <Form className="ui-background" form={form} onFinish={onFinish}>

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

