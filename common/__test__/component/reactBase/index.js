import React from 'react';

import './index.css';

const a = require('./test.png');

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
      testCalled: false,
    }
  };


  handleClick = () => {
    this.test();
    this.setState({
      click: true,
    });
    this.props.onClick(this.props.className);
  }

  test = () => {
    this.setState({
      testCalled: true,
    })
  }

  render() {
    const { testCalled } = this.state;
    const { isModal, className } = this.props;
    
    return (
      <div className="react-base" onClick={this.handleClick}>
          {
            isModal 
            ? <div className={`is-modal ${className}`}>我是modal</div>
            : <div className="not-modal">我不是modal</div>
          }

          {
            testCalled ? <span className="called"></span> : null
          }
      </div>
    )
  }
}

export default Index;