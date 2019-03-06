import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Chat from './Chat';


class App extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.state = {page: 'login', username: '', popuphelper: false};
    this.regExLogin = /^[a-zåäöA-ZÅÄÖ\d-_\s]*$/;
  }

  onLogout(e) {
    this.setState({page: 'login', username: ''});
  }

  onChangeUsername(e) {
    this.setState({username: e.target.value});
  }

  onSubmit() {
    if(this.state.username.length < 1 || this.state.username.length > 12 || !this.regExLogin.test(this.state.username)){
      this.setState({popuphelper: true})
      return;
    }
    else{
      this.setState({page: 'chat', popuphelper: false});
    }
  }
  render() {
    const login = <Login onChangeUsername={this.onChangeUsername} onSubmit={this.onSubmit} popuphelper={this.state.popuphelper}/>;
    const chat = <Chat username={this.state.username} onClick={this.onLogout}></Chat>;
    if(this.state.page === 'login'){
      return (
        <div className="App">
          { login }
        </div>
      );
    }
    else if(this.state.page === 'chat'){
      return (
        <div className='App'>
          { chat }
        </div>
      )
    }
  }
}


export default App;
