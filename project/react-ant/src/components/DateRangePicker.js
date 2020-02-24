import React from 'react';
import moment from 'moment';
import { Form, DatePicker, Col } from 'antd';


const FormItem = Form.Item;

export default class extends React.Component {
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
    };

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    render() {
        const { label, form, startKey, startVal, endKey, endVal } = this.props;
        const { startValue, endValue, endOpen } = this.state;
        
        const dateShowFormat = this.props.dateShowFormat || "YYYY-MM-DD HH:mm:ss";
        
        return (
            <div>
                <Col span={11}>
                    <FormItem>
                        {form.getFieldDecorator(startKey, {
                            initialValue: startValue || (startVal && moment(startVal)) || undefined
                        })(<DatePicker
                            placeholder="开始时间"
                            format={dateShowFormat}
                            showTime
                            disabledDate={this.disabledStartDate}
                            onChange={this.onStartChange}
                            onOpenChange={this.handleStartOpenChange}
                            style={{
                                width: '100%'
                            }} />)}
                    </FormItem>
                </Col>
                <Col span={1}>
                    <span> - </span>
                </Col>
                <Col span={12}>
                    <FormItem>
                        {form.getFieldDecorator(endKey, {
                            initialValue: endValue || (endVal && moment(endVal)) || undefined
                        })(<DatePicker
                                placeholder="结束时间"
                                format={dateShowFormat}
                                showTime
                                disabledDate={this.disabledEndDate}
                                onChange={this.onEndChange}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange}
                                style={{
                                    width: '100%'
                                }} />)}
                    </FormItem>
                </Col>
            </div>
        );
    }
}

