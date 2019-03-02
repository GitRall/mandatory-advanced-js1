// import React from 'react';
import React, { Component } from 'react';
import Message from './Message';
import io from 'socket.io-client';


class Chat extends Component {
  constructor(props){
    super(props);
    this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
    this.handleData = this.handleData.bind(this);
    this.handleNewData = this.handleNewData.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.state = {messages: [], myMessage: '', value: ''}
  }

  componentDidMount() {
    console.log('mounted');

    this.socket.on('connect', function(){
      console.log('connected');
    })
    this.socket.on('messages', this.handleData);

    this.socket.on('new_message', this.handleNewData);
  }

  componentWillUnmount() {
    console.log('unmounted');
  }

  handleData(data) {
    this.setState({messages: data});
  }

  handleNewData(data) {
    let updatedMessages = this.state.messages;
    updatedMessages.push(data);
    this.setState({messages: updatedMessages});
  }

  onSendMessage(e) {
    e.preventDefault();
    if(this.state.myMessage.length < 1 || this.state.myMessage.length > 200) return
    else{
      let newMessage = {username: this.props.username, content: this.state.myMessage}

      const socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
      socket.emit('message', newMessage);
      let messageInput = document.querySelector('.chat__chat-input');
      messageInput.value = '';
    }
  }
  onMessageChange(e) {
    this.setState({myMessage: e.target.value});
  }

  onLogout(e) {
    this.props.onClick();
  }

  render() {
    return (
      <div className='chat'>
        <header>
          <h4 className='chat__username'>{this.props.username}</h4>
          <button className='chat__logout-btn' onClick={this.onLogout}>Logout</button>
        </header>
        <div className='chat__wrapper'>
          <div className='chat__chat-window'>
            <Message messages={this.state.messages}></Message>
          </div>
          <div className='chat__form-container'>
            <form className='chat__chat-form' onSubmit={this.onSendMessage}>
              <input className='chat__chat-input' onChange={this.onMessageChange}></input>
              <button className='chat__chat-btn'>Send</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
