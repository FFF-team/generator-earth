import React from 'react';

let timer = null;
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
     timer = setInterval(() => {
      const { count } = this.state;
        if(count === 100) {
          clearInterval(timer);
          return false;
        }

        this.setState({
          count: count + 1
        })
     }, 1000);
  }

  render() {
    return (
      <div className="timers">
        1
      </div>
    )
  }
}

export default Index;