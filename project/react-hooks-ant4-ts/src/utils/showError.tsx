import React from 'react'
import { isString, isError } from 'lodash'
import { Modal } from 'antd'


/**
 * @description: 显示错误信息
 * @param {Error|string} 错误对象
 */
export const showError = (e?: Error | string): void => {
    let msg;

    if (isError(e)) {
        msg = e.message
    } else if (isString(e)) {
        msg = e;
    }

    msg = msg || '系统异常'

    Modal.error({
        title: '错误提示',
        content: <pre>{msg}</pre>,
    })
}
