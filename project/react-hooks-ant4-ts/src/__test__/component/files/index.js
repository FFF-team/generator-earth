import React from 'react';

const _ = require('lodash');

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
      const arr = [1, 2, 3];
      _.forEach(arr, item => {
          console.log('item', item);
      })
  }

  render() {
    return (
      <div className="files">
        1
      </div>
    )
  }
}

export default Index;