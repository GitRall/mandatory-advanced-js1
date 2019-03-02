import React from 'react';

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
      <div className='login__form-container'>
      <h1 className='login__header'>Chat App</h1>
        <form className='login__form' onSubmit={this.onSubmit}>
          <input className='login__user-input' onChange={this.props.onChangeUsername} type='text'/>
          <button className='login__submit-btn'>Login</button>
        </form>
      </div>
    )
  }
}

export default Login
