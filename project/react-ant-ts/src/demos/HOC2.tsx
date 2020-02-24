import React, { FC } from 'react';

/**
 * 声明注入的Props
 */
export interface ThemeProps {
  primary: string;
  secondary: string;
}

/**
 * 给指定组件注入'主题'
 */
export function withTheme<P>(Component: React.ComponentType<P & ThemeProps>) {
  /**
   * WithTheme 自己暴露的Props
   */
  interface OwnProps {
    x: string,
    primary: string,
  }

  /**
   * 高阶组件的props, 忽略ThemeProps, 外部不需要传递这些属性
   */
  type WithThemeProps = P & OwnProps;

  /**
   * 高阶组件
   */
  const WithTheme = (props: WithThemeProps) => {
    // 假设theme从context中获取
    const fakeTheme: ThemeProps = {
      primary: 'red',
      secondary: 'blue',
    };
    return <Component {...fakeTheme} {...props} />;
  };

  WithTheme.displayName = `withTheme${Component.displayName}`;

  return WithTheme;
}

// Test
const Foo: FC<{ a: number } & ThemeProps> = props => <div style={{ color: props.primary }} />;

const FooWithTheme = withTheme(Foo);

() => {
  <FooWithTheme a={1} x={'yellow'} primary={'yellow'} />;
};