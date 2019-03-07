import React from 'react';
import Popuphelper from './PopupHelper'

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
    const popupHelperText = <p className='popup-helper__text'>Must contain between <br/> 1 - 12 characters.<br/>May contain Alphanumeric characters - _ and spaces</p>;

    if(!this.props.popuphelper){
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
    else {
      return (
        <div className='login__form-container'>
          <h1 className='login__header'>Chat App</h1>
          <form className='login__form' onSubmit={this.onSubmit}>
            <input className='login__user-input' onChange={this.props.onChangeUsername} type='text'/>
            <button className='login__submit-btn'>Login</button>
            <Popuphelper text={popupHelperText}></Popuphelper>
          </form>
        </div>
      )
    }
  }
}

export default Login
