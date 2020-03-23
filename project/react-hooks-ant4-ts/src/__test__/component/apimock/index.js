import React from 'react';
import request from './request';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressList: []
    }
  }

  componentDidMount() {
    request.get('url')
      .then((res) => {
        if (res.rCode === 0) {
          this.setState({
            addressList: res.data
          });
        } else {
        }
      });
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