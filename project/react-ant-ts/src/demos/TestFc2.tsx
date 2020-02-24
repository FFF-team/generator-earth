import React, {FC} from 'react';

export interface ListProps<T> {
  visible?: boolean;
  list: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function List<T>(props: ListProps<T>) {
  return <div />;
}

export const List2 : FC<ListProps<number>> = props => {
    return <div>hello react</div>;
};

// export const List3<T> : FC<ListProps<T>> = (props) => {
//     return <div />;
// }




// Test
function Test() {
  return (
    <List<number>
      list={[1, 2, 3,]}
      renderItem={i => {
        return <div>{i}</div>
      }}
    />
  );
}

Test()

