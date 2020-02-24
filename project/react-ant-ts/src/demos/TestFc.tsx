import React from 'react';
import { Layout } from './TestChild'

export interface ListProps<T> {
    visible: boolean;
    list: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
}

export function List<T>(props: ListProps<T>) {
    return <div>{props.list.map((item,i)=>{
        return props.renderItem(item,i)
    })}</div>;
}

// Test
export default function TestFc() {
    
    
    return (
        <div className="TestFc">111,
            {List<number>({
                list: [1,2,3],
                visible: true,
                renderItem: (item, i) => {
                    /*自动推断i为number类型*/
                    return <div className="aaa">{item}</div>
                }
            })}

            
            <List<{a:string,b?:number}>
                list={[{a:'a1'}, {a:'a2', b:1}, {a:'a3'}]}
                visible={true}
                renderItem={(item, i) => {
                    /*自动推断i为number类型*/
                    return <div className="aaa">{item.a}</div>
                }}
            />
            <Layout>
                <div />
            </Layout>
        </div>
  );
}