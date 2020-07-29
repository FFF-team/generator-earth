import * as React from 'react';
import * as moment from 'moment';
import { Form, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { getUUID } from 'ROOT_SOURCE/utils'

const FormItem = Form.Item;


const formItemLayout = {
    labelCol: {
        xs: {span: 16},
        sm: {span: 8},
    }
};


export interface Props extends FormComponentProps {
    startKey: string;
    startVal: string;
    endKey: string;
    endVal: string;
    showTime?: boolean;
    label?: string;
    formItemLayout: any;
    className?: string;
    dateShowFormat?: string;
    extraParams?: any;
    DeleteNode: React.ReactNode | JSX.Element | any;
    extraSeparation?: string;
}

export default class extends React.Component<Props> {
    state = {
        startValue: '',
        endValue: '',
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
            this.setState({endOpen: true});
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({endOpen: open});
    }

    render() {
        const {form, startVal, extraSeparation, label, endVal, DeleteNode} = this.props;
        let {startKey, endKey} = this.props;
        const {startValue, endValue, endOpen} = this.state;

        const dateShowFormat = this.props.dateShowFormat || "YYYY-MM-DD HH:mm:ss";


        const wrapProps = {className: this.props.className};

        // 这个key在设置的时候可能会被删完  这里需要设置一个默认值
        startKey = startKey || getUUID();
        endKey = endKey || getUUID();


        return (
            <div {...wrapProps}>
                <div className="ant-form-item costom-date-range">
                    <FormItem colon={false} label={label}>
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
                                width: 300
                            }}/>)}

                    </FormItem>

                    <span className="center-hr"> {extraSeparation ? extraSeparation : '至'} </span>

                    <FormItem {...formItemLayout} colon={false}>
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
                                width: 300
                            }}/>)}
                    </FormItem>
                </div>
                {DeleteNode && <DeleteNode/>}
            </div>
        );
    }
}

