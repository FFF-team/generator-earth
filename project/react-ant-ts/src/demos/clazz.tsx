import React from 'react';

/**
 * 声明Props类型
 */
export interface MyComponentProps {
  className?: string;
  username: string;
}

const defaultState = {count: 1};
type IState = Readonly<typeof defaultState>;

export default class Main extends React.Component<MyComponentProps, IState> {
  readonly state: IState = defaultState;

  public static defaultProps = {
    username: 'lily',
    className:'english',
  }
  render () {
    //this.state={count:2};
    if(this.props.className)
      return (<div>a {this.props.username}|
        {this.props.className.length}</div>)
    else
      return null
  }
}
Main.defaultProps = {
  username: 'lily',
  className:'english',
};


() => {
  return <Main  />
}