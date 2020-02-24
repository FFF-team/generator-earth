import React from 'react'


export function getCompDecorator(settings/*props*/) {
    return function decorateComp(Comp) {
        return React.cloneElement(
            Comp,
            settings,
        )
    }
}


export function expandableTableDecorator(settings={}/*object*/) {
    
    let { InnerTable } = settings
    
    let getExpandedRowRender = (record) => {
        // 从formData及当前rowRecord 传递innerTable(请求)所需的数据
        // 这里仅做简单处理：传递所有数据
        let params = Object.assign( {}, this.props.formData, record )
        return <InnerTable {...params} />
    }
    
    return function decorateClass(Clazz) {
        Object.assign(Clazz.prototype, settings, {
            getExpandedRowRender: getExpandedRowRender
        })
        return Clazz
    }
}
