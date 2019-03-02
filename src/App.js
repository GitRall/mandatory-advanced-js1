import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Chat from './Chat';
// import io from 'socket.io-client';
// const socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');


class App extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.state = {page: 'login', username: ''};
  }

  componentDidMount() {
    // socket.on('connect', function(){
    //   console.log('connected');
    // });
    // socket.on('messages', function(data){
    //   console.log(data);
    // });
    // socket.on('new_message', function(data){
    //   console.log(data);
    // });
  }

  onLogout(e) {
    this.setState({page: 'login', username: ''});
  }

  onChangeUsername(e) {
    this.setState({username: e.target.value});
  }
  onSubmit() {
    if(this.state.username.length < 1 || this.state.username.length > 12) return;
    else{
      this.setState({page: 'chat'});
    }
  }
  render() {
    const login = <Login onChangeUsername={this.onChangeUsername} onSubmit={this.onSubmit}/>;
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
