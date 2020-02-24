import React, { FC } from 'react';

export interface HelloProps {
  name: string;
}
const defaultPropsHellll = { name: 'TJ' };
export const Hellll = ({name}: HelloProps) => {
    return <div>hell {name}</div>
}
Hellll.defaultProps = defaultPropsHellll






const tuple = <T extends string[]>(...args: T) => args;

// 使用
const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'danger', 'link');
export type ButtonType = (typeof ButtonTypes)[number];





export const Hello: FC<HelloProps> = ({ name }) => <div>Hello {name}!</div>;


export const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  defaultProps: DP,
  Cmp: React.ComponentType<P>,
) => {
  type RequiredProps = Omit<P, keyof DP>
  type Props = Partial<DP> & Required<RequiredProps>
  Cmp.defaultProps = defaultProps
  return (Cmp as React.ComponentType<any>) as React.ComponentType<Props>
}

const defaultProps = { name: 'TJ' };
type DefaultProps = typeof defaultProps

const Hello2: React.FC<DefaultProps> = ({name}) => {
  return <div>{name}</div>
}

export const HelloWithDefaultProps = withDefaultProps(defaultProps, Hello2)

export const Hello2WithDP = withDefaultProps<DefaultProps>(defaultProps, ({name})=>{
  return <div>{name}</div>
})

export default class Main extends React.Component<DefaultProps> {
  render() {
    return <>
      <HelloWithDefaultProps />
      <Hello2WithDP />
      <Hellll />
    </>
  }
}
