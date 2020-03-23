import { useState, useMemo } from 'react'
import { PaginationConfig } from 'antd/lib/pagination'
import { CURRENT_PAGE, PAGE_SIZE, TOTAL } from 'ROOT_SOURCE/base/BaseConfig'
import { sleep } from 'ROOT_SOURCE/utils/index'


interface IProps {
    /* redux存储的form表单查询数据 */
    formData?: IAnyObject;
    /* form 表单提交前的勾子方法，可以用来清理table的选中数据，一般是redux-action中提供的方法 */
    resetTable?: Function;
    /* 提交表单更新table列表数据方法，一般是redux-action中提供的方法，也可以自定义 */
    updateTable?: (values: IAnyObject) => any;
    total?: number;
    currentPage?: number;
    pageSize?: number;
}


export function useBaseTable(
    {
        formData = {},
        resetTable,
        updateTable,
        // 作用于没有使用redux时，需要传下面几个参数，这时pageSize和currentPage非必传，total毕传
        total,
        // 若传入currentPage可以使table初始展示在第几页
        currentPage,
        pageSize = 10,
    }: IProps = {}
): [PaginationConfig, (pagination: PaginationConfig) => Promise<void>] {
    const [current, setCurrent] = useState<number | undefined>(currentPage)
    /**
     * 分页，排序，筛选回调
     * 目前需求仅为分页
     */
    async function onTableChange(pagination: PaginationConfig): Promise<void> {
        // 重置table
        resetTable && resetTable()

        // 提交表单最好新一个事务，不受其他事务影响
        await sleep()

        const current = pagination.current

        updateTable && updateTable({
            ...formData,
            [CURRENT_PAGE]: current //pagination选中另一页面
        })

        // 作用于没有传formData情况
        setCurrent(current)
    }


    /**
    * table分页信息
    * @override
    * component.pagination {pageSize/rows, pageNo/page, total}
    * 转换为
    * antd.pagination {pageSize, current, total}
    */
    const pagination: PaginationConfig = useMemo(() => ({
        showTotal: (total, range) => `${range[0]}-${range[1]} (共${total}条)`,
        pageSize: formData[PAGE_SIZE] || pageSize,
        total: formData[TOTAL] || total,
        current: formData[CURRENT_PAGE] || current,
    }), [formData, total, pageSize, current])


    return [pagination, onTableChange]
}
