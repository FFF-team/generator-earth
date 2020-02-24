import moment from 'moment'
import _ from 'lodash'


/**
 * n 可以是string, number
 * 返回带小数点的number (8800 => 88.00)
 */
export function decimalizeMoney(n, digit=2) {
    let _n = +n
    
    if (isNaN(_n))
        return ''
    
    return (_n/100).toFixed(digit)
}


/**
 * d 可以是string, long, date, moment
 * 返回string
 */
export function formatDate(d, f='YYYY-MM-DD') {
    if (!d)
        return null
    
    return moment(d).format(f)
}


/**
 * format对象中所有moment值
 */
export function mapMoment(obj, f='YYYY-MM-DD') {
    if (!obj)
        return null
    
    return _.mapValues(obj, function(v) {
        return moment.isMoment(v) ? v.format(f) : v
    })
}



/**
 * ant-d date-picker disabledDate
 * https://github.com/ant-design/ant-design/blob/a6d545f9fa970e481e14bd33b31cb640cc086e40/components/date-picker/demo/disabled-date.md
 * https://github.com/ant-design/ant-design/blob/1735d89a66700ebb8c09eb94aa573b393ea14d23/components/date-picker/index.zh-CN.md
 * 
 * 该方法将在before和after之外current全部disable (即return true的全部disable)
 */
export function disablePickerDate(type='day', beforeMonth=moment(), afterMonth=moment()) {
    return (current) => {
        
        let before = moment(beforeMonth).startOf(type)
        let after  = moment(afterMonth).endOf(type)
        
        return current<before || current>after
    }
}