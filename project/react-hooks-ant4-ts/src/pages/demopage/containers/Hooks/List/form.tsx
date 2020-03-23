import React, { FC, useEffect } from 'react'
import {
    Form,
    Input,
    Select,
    DatePicker,
    Button,
} from 'antd'
import { useBaseForm } from 'ROOT_SOURCE/hooks';
import { MOMENT_FORMATE } from 'ROOT_SOURCE/utils/fieldFormatter'

import { IReducerProps } from './reducers'
import { IActionProps } from './actions'


const { Option } = Select
const { RangePicker } = DatePicker
const DATE_FORMAT = {
    date: MOMENT_FORMATE.date,
    signDate: MOMENT_FORMATE.date,
}


const FormContainer: FC<IReducerProps & IActionProps> = (props) => {
    const [form, onFinish, onReset, onExport] = useBaseForm({ ...props, adaptFormData: adaptFormData })

    function adaptFormData(values: IAnyObject): IAnyObject {
        return values;
    }

    // 初始化调用
    useEffect(() => {
        console.log('to do init fetch in here');
    }, []);

    return (
        <Form
            className='ui-background'
            layout='inline'
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
            <Form.Item name='note' label='Note' rules={[{ required: false }]}>
                <Input placeholder='Pleace input' allowClear />
            </Form.Item>
            <Form.Item name='gender' label='Gender' rules={[{ required: false }]}>
                <Select
                    placeholder='Select a option and change input text above'
                    allowClear
                >
                    <Option value='male'>male</Option>
                    <Option value='female'>female</Option>
                    <Option value='other'>other</Option>
                </Select>
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {({ getFieldValue }) => {
                    return getFieldValue('gender') === 'other' ? (
                        <Form.Item name='customizeGender' label='Customize Gender' rules={[{ required: false }]}>
                            <Input allowClear />
                        </Form.Item>
                    ) : null
                }}
            </Form.Item>
            <Form.Item name='date' label='DatePicker'>
                <DatePicker format={DATE_FORMAT.date} allowClear />
            </Form.Item>
            <Form.Item
                name='username'
                label='Username'
                rules={[{ required: false, message: 'Username is required' }]}
            >
                <Input style={{ width: 160 }} placeholder='Please input' allowClear />
            </Form.Item>
            <Form.Item label='Address'>
                <Input.Group compact>
                    <Form.Item
                        name={['address', 'province']}
                        noStyle
                        rules={[{ required: false, message: 'Province is required' }]}
                    >
                        <Select placeholder='Select province'>
                            <Option value='Zhejiang'>Zhejiang</Option>
                            <Option value='Jiangsu'>Jiangsu</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['address', 'street']}
                        noStyle
                        rules={[{ required: false, message: 'Street is required' }]}
                    >
                        <Input style={{ width: '50%' }} placeholder='Input street' />
                    </Form.Item>
                </Input.Group>
            </Form.Item>
            <Form.Item name='signDate' label='签约时间'>
                <RangePicker format={DATE_FORMAT.signDate} allowClear />
            </Form.Item>
            <Form.Item className='ui-btn-group'>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
                <Button htmlType='button' onClick={onReset}>
                    Reset
                </Button>
                <Button htmlType='button' onClick={onExport.bind(null, '/api/export')}>
                    Export
                </Button>
            </Form.Item>
        </Form>
    )
}


export default FormContainer;
