import React from 'react';

import C from './c';

export default class Index extends React.Component {
    render() {
      return (
        <div className="index" onClick={this.props.onClick}>
            <C />
        </div>
      )
    }
}