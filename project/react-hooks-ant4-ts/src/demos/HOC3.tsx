import React, { FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'

export interface MyProps {
  my: string,
}

interface IA {
  a: string,
}
interface IB {
  b: string,
}


withRouter(class extends React.Component<RouteComponentProps&MyProps> {
  render() {
    this.props
    return null
  }
})

type IMyHoc = (C: React.ComponentType<IB>) => React.ComponentType
const myHoc: IMyHoc = (C: React.ComponentType<IB>) => {
  return function(props) {
    return <C b="bb" {...props} />
  }
}

type IMyHoc2<InjectP> = <T>(C: React.ComponentType<T&InjectP>) => React.ComponentType<T>
const myHoc2: IMyHoc2<IB> = (C) => {
  return function(props) {
    return <C b="bb2" {...props} />
  }
}
const myHoc3 = (C: React.ComponentType<IB>) => {
  return function(props: IB) {
    return <C {...props} />
  } as React.FC<IB>
}



export default myHoc(class extends React.Component<IB&MyProps> {
  render() {
    return <>
      {this.props.b},{this.props.my} <HOC2 my="hoc2my"/> 
      {myHoc3(function(props) {
        return <>{props.b}</>
      })({b:'dfsfsds'})}
    </>
  }
})

export const HOC2 = myHoc2(class extends React.Component<IB&MyProps> {
  render() {
    return <>{this.props.b},{this.props.my}</>
  }
})

type HOC<InjectedProps, OwnProps = {}> = <P>(
  Component: React.ComponentType<P & InjectedProps>,
) => React.ComponentType<P & OwnProps>;

export interface ThemeProps {
  primary: string;
  secondary: string;
}

export const withTheme: HOC<ThemeProps> = Component => props => {
  // 假设theme从context中获取
  const fakeTheme: ThemeProps = {
    primary: 'red',
    secondary: 'blue',
  };
  return <Component {...fakeTheme} {...props} />;
};

() => {
  let A = withTheme(function(props){
    return <>{props.primary}</>
  })
  return <A />
}





type THoc = <P>(C: React.ComponentType<P&IB>)=>React.ComponentType<IA>


const hoc: THoc = (Comp: React.ComponentType<IB>) => {
  return function(props) {
    return <Comp b='456' {...props}/>
  }
}

const B = hoc<IA>(class extends React.Component<IA&IB> {
  render() {
    return <>{this.props.a}, {this.props.b}</>
  }
})

let main = () => {
  return <B a="123" />
}

//export default main