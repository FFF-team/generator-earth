import React, { FC, useEffect } from 'react'
import {
    useHistory,
    useParams,
} from 'react-router-dom'
import moment from 'moment'
import {
    Button,
    Form,
    Input,
    DatePicker,
} from 'antd'
import request from 'ROOT_SOURCE/utils/request'
import { useBaseContext } from 'ROOT_SOURCE/hooks'
import { sleep } from 'ROOT_SOURCE/utils'
import { showError } from 'ROOT_SOURCE/utils/showError'
import Rules from 'ROOT_SOURCE/utils/validateRules'
import { MOMENT_FORMATE } from 'ROOT_SOURCE/utils/fieldFormatter'


const DATE_FORMAT = {
    contractDate: MOMENT_FORMATE.time,
}


const Item: FC<{}> = () => {
    const [form] = Form.useForm()
    const routeHistory = useHistory()
    const routeParams = useParams()
    const CONTAINER_ROUTE_PREFIX = useBaseContext();

    // 初始化调用
    useEffect(() => {
        init()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function init(): Promise<void> {
        try {
            let { data } = await request.get('/asset/viewAsset', routeParams)
            data.contractDate = data.contractDate ? moment(data.contractDate) : undefined
            form.setFieldsValue(data)
        } catch (e) {
            showError(e)
        }
    }

    async function onFinish(values: object): Promise<void> {
        try {
            // 提交表单最好新一个事务，不受其他事务影响
            await sleep()

            // action
            await request.post('/asset/addAsset', values)

            // 提交后返回list页
            routeHistory.push(`${CONTAINER_ROUTE_PREFIX}/list`)
        } catch (e) {
            showError(e)
        }
    }

    return (
        <Form
            className='ui-background'
            form={form}
            initialValues={{
                gender: 'male',
                __formate__: DATE_FORMAT
            }}
            onFinish={onFinish}
        >
            {/* can help auto formate date to string */}
            <Form.Item name='__formate__' noStyle>
                <Input type='hidden' />
            </Form.Item>

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
                <DatePicker showTime format={DATE_FORMAT.contractDate} />
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



export default Item
