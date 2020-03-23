function reset(arr: ReadonlyArray<number>) {
    //arr[1] = 'new value';
    return arr
}

function reset2(obj: Readonly<{x: string}>) {
    //obj.x = '2'
    return obj
}


reset([1, 2])


type Foo = {
    bar: number;
    bas: number;
  };
  
  type FooReadonly = Readonly<Foo>;
  
  const foo: Foo = { bar: 123, bas: 456 };
  const fooReadonly: FooReadonly = { bar: 123, bas: 456 };
  
  foo.bar = 456; // ok
  fooReadonly.bar = 456; // Error: bar 属性只读