import React from 'react';

// 假定有如下接口IProps及组件Test
interface IProps {
  className?: string;
  children?: React.ReactNode;
}

export function Test(props: IProps) {
  return <div>{props.className}</div>
}


// 现在需要定义高阶组件hocWrapper，为其增加props参数route
interface IHoc {
  route?: string
}

// 需要将原来的IProps当泛型传入
function hocWrapper<P>(Comp: React.ComponentType<P&IHoc>): React.ComponentType<P&IHoc> {
  return function(props) {
    let pHoc = {route: 'madeByHoc_defaultVal'}
    return <Comp  {...pHoc} {...props} />
  }
}

// 使用
export default function TestHoc() {
  function BizComp(props: IProps&IHoc) {
    return <div>hello react{props.className}, {props.route}</div>;
  } 

  let C = hocWrapper<IProps>(BizComp);
  let D = hocWrapper<IProps>((props) => {
    return <div>hello react{props.className}, {props.route}</div>;
  });
  
  return <div>
    <section>title</section>
    <C route={'abc'} />
    <D />
  </div>

}