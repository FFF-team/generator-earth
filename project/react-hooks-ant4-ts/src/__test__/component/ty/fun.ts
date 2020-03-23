interface type {
  name: string,
  age: number
}

export default (name: string, age: number): type => {
  return { name: name, age: age }
}