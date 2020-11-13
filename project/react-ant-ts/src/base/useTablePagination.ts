import { CURRENT_PAGE, PAGE_SIZE, TOTAL } from 'ROOT_SOURCE/base/BaseConfig'


export default function useTablePagination(props) {

    /**
     * table分页信息
     * @override
     * component.pagination {pageSize/rows, pageNo/page, total}
     * 转换为
     * antd.pagination {pageSize, current, total}
     */
    const pagination = {
        pageSize: props.formData[PAGE_SIZE],
        current: props.formData[CURRENT_PAGE],
        total: props.formData[TOTAL],
    }
    
    
    /**
     * 分页，排序，筛选回调
     * 目前需求仅为分页
     */
    const onPageChange = (pagination) => {
        // 重置table
        props.resetTable && props.resetTable()
        
        props.updateTable && props.updateTable({
            ...props.formData,
            [CURRENT_PAGE]: pagination.current //pagination选中另一页面
        })
    }


    return {
        pagination,
        onChange: onPageChange,
    }
}

