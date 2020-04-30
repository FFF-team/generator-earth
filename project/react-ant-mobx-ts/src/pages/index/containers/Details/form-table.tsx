/**
 * Created by Chuans on 2019/2/21
 * Author: Chuans
 * Github: https://github.com/chuans
 * Time: 3:19 PM
 */

import * as React from 'react';
import TableContainer from 'ROOT_SOURCE/components/common-table-list/TableContainer';
import { Form, Button, Input } from 'antd';


export default class extends TableContainer {
    state = {
        title: 'ID'
    }

    async componentDidMount() {

        await this.getData();
    }
    getColumns() {
        return [ {
            title: this.state.title,
            dataIndex: 'id',
            key: 'id',
            width: 100
        }, {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: 200
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: 150
        }, ]
    }

    /**
     * 自定义form 的props
     */
    formProps() {
        return {
            layout: 'inline'
        }
    }


    getSearchItems() {
        const { getFieldDecorator } = this.props.form;

        return (
            <React.Fragment>
                <Form.Item label={('查询名')}>
                    {getFieldDecorator('name', { initialValue: '' })(
                        // TODO 暂时没发现下面这个Input在编辑器内会抛错，编译正常
                        // @ts-ignore
                        <Input style={{ width: 400 }} placeholder="请输入名称进行查询（胡歌有重复的，不支持模糊查询）"/>
                    )}
                </Form.Item>
                <Form.Item label={('查询ID')} style={{ display: 'none' }}>
                    {getFieldDecorator('type', { initialValue: 'test' })(
                        // 此表单只作为mock数据做筛选搜索作用
                        // @ts-ignore
                        <Input placeholder=""/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">查询</Button>
                </Form.Item>

            </React.Fragment>
        )

    }
}
