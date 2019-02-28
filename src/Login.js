import React, { Component } from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input onChange={this.props.onChangeUsername} type='text' />
        <button>Submit</button>
      </form>
    )
  }
}

export default Login
