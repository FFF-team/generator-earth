import React, { ReactNode } from 'react';

export interface LayoutProps {a?:string, children?: ReactNode}

export function Layout<C>(props: LayoutProps) {
  return <div className="layout">{props.children}</div>;
}
export function Child(porps: any) {
  return <span>I am child</span>
}

// Main
class Main extends React.Component {
  render() {
    return (
      <Layout>
        <Child />
      </Layout>
    )
  }
}

console.log(Main)