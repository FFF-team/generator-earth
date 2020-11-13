import React, { useEffect } from 'react'
import { Input, Button, Select, Form, DatePicker } from 'antd'
import { RouteComponentProps } from 'react-router-dom'



type IFormProps4List = RouteComponentProps & {
    updateTable: Function, //(params?: {}) => Promise<any>,
    formData: any,
}



export default function (props: IFormProps4List) {



    useEffect(()=>{
        async function fetchData() {
            // item或add页面使用props.history.push(`${this.context.CONTAINER_ROUTE_PREFIX}/list`)
            // 跳转到本页面时，使用store中的formData拉取新的tableData
            if (props.history && props.history.action === 'PUSH') {
                if (props.updateTable && props.formData) {
                    let r = await props.updateTable(props.formData)
                    console.log('update done! result is: ', r)
                }
            }
        }

        fetchData();
    }, []);



    const onFinish = async (values: any) => {
        
        if (values.signDate) {
            values.startDate = values.signDate[0].format('YYYY-MM-DD HH:mm:ss');
            values.endDate = values.signDate[1].format('YYYY-MM-DD HH:mm:ss');
        }
        
        delete values.signDate;

        // action
        props.updateTable && props.updateTable(values);
    }

    

    return (
        <Form className="ui-background" layout="inline" onFinish={onFinish} initialValues={props.formData}>
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
    );
}
