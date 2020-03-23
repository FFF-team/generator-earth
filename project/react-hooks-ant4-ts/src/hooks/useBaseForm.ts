import { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Form } from 'antd'
import { FormInstance } from 'antd/lib/form'

import download from 'ROOT_SOURCE/utils/download'
import { showError } from 'ROOT_SOURCE/utils/showError'


interface IProps {
    /* redux存储的form表单查询数据 */
    formData?: IAnyObject;
    /* form 表单提交前的勾子方法，可以用来清理table的选中数据，一般是redux-action中提供的方法 */
    resetTable?: Function;
    /* 提交表单更新table列表数据方法，一般是redux-action中提供的方法，也可以自定义 */
    updateTable?: (values: IAnyObject) => any;
    /* 当进入页面时是否自动查询，默认自动查询 */
    autoSubmit?: boolean;
    /* form表达查询前对查询数据进行格式化处理方法 */
    adaptFormData?: (values: IAnyObject) => IAnyObject;
}


export function useBaseForm({
    formData,
    resetTable,
    updateTable,
    autoSubmit = true,
    adaptFormData = values => values,
}: IProps = {}): [
        // antd-form 实例
        FormInstance,
        // 提交表单
        (values: IAnyObject) => void,
        // 重置表单
        () => void,
        // 导出表单数据
        (api: string) => void
    ] {

    const [form] = Form.useForm()

    // 初始化调用，进入页面请求列表
    useEffect(() => {
        initFetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function initFetch(): void {
        if (!formData) {
            return;
        }
        if (!isEmpty(formData)) {
            form.setFieldsValue(formData)
            // 这时使用redux缓存数据更新，可以直接请求上传查看页面
            autoSubmit && updateTable && updateTable(formData)
            return;
        }
        // 首次进入页面，自动触发submit
        autoSubmit && form.submit()
    }

    // 手动触发提交表单
    function onFinish(values: IAnyObject): void {
        // 重置table
        resetTable && resetTable()
        // _formData里的一些值需要适配
        const _formData: IAnyObject = adaptFormData(values)
        // action
        updateTable && updateTable(_formData)
    }

    // 重置表单
    function onReset(): void {
        form.resetFields()
    }

    // 导出表单
    async function onExport(exportApi: string) {
        console.log(form.getFieldsValue())
        if (!exportApi) return
        try {
            await download(exportApi, { ...formData, ...form.getFieldsValue() })
        } catch (e) {
            showError(e)
        }
    }

    return [form, onFinish, onReset, onExport]
}
