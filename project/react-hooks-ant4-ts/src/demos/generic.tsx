import React from 'react'

// list完全由组件传入的类型决定
interface IProps<T> {
    list: T[],
    children : (item: T, index: number) => React.ReactNode
}

// 定义组件 使用函数声明方式。（无法使用函数表达式方式使用React.FC定义）
function InfiniteScrollList<T>({ list, children }: IProps<T>): React.ReactElement {
    // 列表中其他逻辑...
    return <div>{list.map(children)}</div>;
}

// class InfiniteScrollList2<T> extends React.Component<IProps<T>, {}> {
//     render() {
//         return (
//             <div>
//                 {this.props.list.map(this.props.children)}
//             </div>
//         )
//     }
// }


interface IBankListItem {
    name: string,
    code: string
}

const data: IBankListItem[] = [
    {
        name: '中国银行',
        code: '11'
    },
    {
        name: '招商银行',
        code: '22'
    }
];


class Ret extends React.PureComponent {
    render() {
        return (
            <InfiniteScrollList list={data}>
                {
                    (item) => {
                        // do something
                        // 这里的item就是IBankListItem类型
                        return <>{item.name}</>
                    }
                }
            </InfiniteScrollList>
        )
    }
}

()=>{
    return <Ret />
}