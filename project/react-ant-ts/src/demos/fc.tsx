import React, { FC } from 'react';

/**
 * 声明Props类型
 */
export interface MyComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const MyComponent: FC<MyComponentProps> = props => {
  return <div>hello react</div>;
};


export interface MyComponentProps2 {
  className?: string;
  style?: React.CSSProperties;
  // 手动声明children
  children?: React.ReactNode;
}

export function MyComponent2(props: MyComponentProps2) {
  return <div>hello react</div>;
}


interface TResult {
  code: number
}

function testResult() : TResult {
  return {code: 1}
}
const testResult2: ()=>TResult = function() {
  return {code: 1}
}

testResult()
testResult2()




const C: (n: number)=>Promise<any> = (n) => {
  return new Promise(console.log);
}
C(1)

function CC(n: number): Promise<any> {
  return new Promise(console.log);
}
CC(2)




interface FunctionComp {
  (name: string): string;
}
const testFunctionComp: FunctionComp = function(name) {
  return 'hello ' + name
}
console.log(testFunctionComp('peter'))



interface IPersion {
  name: string,
  age?: number,
}
let person: IPersion = {
  name: 'jia'
}
console.log(person)