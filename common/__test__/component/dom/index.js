import React from 'react';
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    let script = document.createElement('script');
		script.id = 'dom';
		// script.src = url;
		document.body.appendChild(script);
  }

  render() {
    return (
      <div className="dom">
        <button className="btn"></button>

        <button data-testid="button" type="submit" disabled>submit</button>
        <fieldset disabled><input type="text" data-testid="input" /></fieldset>
        <a href="..." disabled>link</a>
      </div>
    )
  }
}

export default Index;