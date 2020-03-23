import { message, Modal } from 'antd'
import { isError } from 'lodash'
import request from './request'


interface IDownload {
    (url: string, params?: object, type?: string): Promise<any>
}


const URL = window.URL || window.webkitURL
const download: IDownload = (url, params, type = 'get') => new Promise(async (resolve, reject) => {
    try {
        const res = await request[type](url, params)

        // 请求出错，比如：状态码值404情况
        if (isError(res)) {
            throw new Error(`系统异常，请求失败\n错误信息：${res.message || ''}`)
        }
        // 如果返回的是json，则说明导出失败
        if ('code' in res) {
            throw new Error(`导出失败\n错误码值：${res.code}\n错误信息：${res.msg || ''}`)
        }

        // 获取文件名
        const filename = res.headers.get('Content-Disposition').match(/filename=(.*)/) || []
        const blob = await res.blob()

        const fileUrl = URL.createObjectURL(blob)
        resolve()

        const a = document.createElement('a')
        a.href = fileUrl
        a.download = decodeURIComponent(filename[1] || '文件.zip').trim()
        a.click()
        window.URL.revokeObjectURL(fileUrl)
    } catch (e) {
        reject(e)
    }
})


export default download


// 通过 iframe 下载
export const downloadByIframe = (url: string, time = 1) => {
    if (!url) {
        message.warn('下载失败，下载地址为空！')
        return
    }
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none' // 防止影响页面
    iframe.style.height = '0' // 防止影响页面
    iframe.src = url
    document.body.appendChild(iframe) // 这一行必须，iframe挂在到dom树上才会发请求
    // 3分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
    setTimeout(() => {
        iframe && iframe.remove()
    }, 3 * 60 * 1000)
    setTimeout(() => {
        if (!iframe) return
        const el = iframe.contentWindow || iframe.contentDocument
        if (!el) return
        try {
            // eslint-disable-next-line no-unused-expressions
            el.location.href
        } catch (err) {
            // err:SecurityError: Blocked a frame with origin 'http://*********' from accessing a cross-origin frame.
            console.log(err)
            Modal.error({
                title: '下载失败',
                content: `下载地址：${url}`
            })
            iframe && iframe.remove()
        }
    }, time * 1000)
}
