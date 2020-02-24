import React from 'react';
import moment from 'moment';
import { Form, DatePicker, Col } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form'


const FormItem = Form.Item;


type momentType = moment.Moment | null | undefined;


/**
 * 定义父组件调用DateRangePicker时需要传入的props
 */
interface DateRangePickerProps {
    dateShowFormat?: any,
    form: WrappedFormUtils,
    startVal?: moment.MomentInput,
    startKey: string,
    endVal?: moment.MomentInput,
    endKey: string,
}


/**
 * 定义DateRangePicker的state
 */
interface DateRangePickerState {
    startValue: momentType,
    endValue: momentType,
    endOpen: boolean,
    [K: string]: momentType | boolean,
}





export default class DateRangePicker extends React.Component<DateRangePickerProps, DateRangePickerState> {
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
    };

    disabledStartDate = (startValue: momentType) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return (startValue as moment.Moment).valueOf() > (endValue as moment.Moment).valueOf();
    }

    disabledEndDate = (endValue: momentType) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return (endValue as moment.Moment).valueOf() <= (startValue as moment.Moment).valueOf();
    }

    onChange = (field: string, value: momentType) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value: momentType) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value: momentType) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open: boolean) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open: boolean) => {
        this.setState({ endOpen: open });
    }

    render() {
        const { form, startKey, startVal, endKey, endVal } = this.props;
        const { startValue, endValue, endOpen } = this.state;
        
        const dateShowFormat = this.props.dateShowFormat || "YYYY-MM-DD HH:mm:ss";
        
        return (
            <div>
                <Col span={11}>
                    <FormItem>
                        {form.getFieldDecorator(startKey, {
                            initialValue: startValue || (startVal && moment(startVal)) || ''
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
                            initialValue: endValue || (endVal && moment(endVal)) || ''
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

