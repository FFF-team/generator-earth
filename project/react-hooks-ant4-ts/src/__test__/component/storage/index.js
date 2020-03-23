import React from 'react';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressList: []
    }
  }

  componentDidMount() {
      localStorage.setItem('name', "wang");
      sessionStorage.setItem('age', 18);
  }

  render() {
    return (
      <div className="apimock">
        1
      </div>
    )
  }

}

export default Index;