import * as React from 'react';

interface IProps {
  isModal: boolean
}

interface IState {
  list: Array<string>
}

class Index extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      list: ['a']
    }
  }

  render() {
    return (
      <div className="ty">
        1
      </div>
    )
  }
}

export default Index