import React from 'react';
/**
 * 声明Props类型
 */
export interface IProps<T> {
  username: string;
  func: (userid: T) => any
}

export class List<T> extends React.Component<IProps<T>> {
  public render() {
    return null
  }
}

() => {
  return <List<number> username="jjr" func={(userid)=>{console.log(userid)}}  />
}