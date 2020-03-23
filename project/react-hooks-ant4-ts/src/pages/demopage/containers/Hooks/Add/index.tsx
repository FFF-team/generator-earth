import React, { FC, useEffect } from 'react'
import {
    useHistory,
} from 'react-router-dom'
import { Button, Form, Input, DatePicker } from 'antd'

import { useBaseContext } from 'ROOT_SOURCE/hooks'
import request from 'ROOT_SOURCE/utils/request'
import { sleep } from 'ROOT_SOURCE/utils'
import Rules from 'ROOT_SOURCE/utils/validateRules'


const Add: FC<{}> = () => {
    const [form] = Form.useForm()
    const routeHistory = useHistory()
    const CONTAINER_ROUTE_PREFIX = useBaseContext()

    // 初始化调用
    useEffect(() => {
        form.setFieldsValue({
            note: 'note'
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function onFinish(values: object): Promise<void> {
        try {
            // 提交表单最好新一个事务，不受其他事务影响
            await sleep()

            // action
            await request.post('/asset/addAsset', values)

            // 提交后返回list页
            routeHistory.push(`${CONTAINER_ROUTE_PREFIX}/list`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form className='ui-background' form={form} onFinish={onFinish}>
            <Form.Item name='assetName' label='资产方名称' rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name='contract' label='签约主体' rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name='contractDate' label='签约时间' rules={[{ required: true }]}>
                <DatePicker showTime />
            </Form.Item>

            <Form.Item name='contacts' label='联系人'>
                <Input />
            </Form.Item>

            <Form.Item name='contactsPhone' label='联系电话' rules={[{ pattern: Rules.phone, message: '无效' }]}>
                <Input maxLength={11} />
            </Form.Item>

            <Form.Item className='ui-btn-group ui-align-center'>
                <Button type='primary' htmlType='submit'>
                    提交
                </Button>
                <Button htmlType='button' onClick={routeHistory.goBack}>
                    取消/返回
                </Button>
            </Form.Item>
        </Form>
    )

}



export default Add
