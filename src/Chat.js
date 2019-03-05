// import React from 'react';
import React, { Component } from 'react';
import Message from './Message';
import io from 'socket.io-client';

function scrollBottom() {
  let chatWindow = document.querySelector('.chat__chat-window');
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

class Chat extends Component {
  constructor(props){
    super(props);
    this.handleData = this.handleData.bind(this);
    this.handleNewData = this.handleNewData.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.state = {messages: [], myMessage: '', value: ''}
  }

  componentDidMount() {
    this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
    console.log('mounted');
    this.socket.on('connect', function(){
      console.log('connected');
    })
    this.socket.on('disconnect', function(){
      console.log('disconnected');
    })
    this.socket.on('messages', (data) => {
      new Promise ((resolve, reject) => {
        resolve(this.handleData(data))
      })
      .then(() => {
        scrollBottom();
      })
    });
    this.socket.on('new_message', this.handleNewData);
  }

  componentWillUnmount() {
    console.log('unmounted');
    this.socket.disconnect();
    this.socket = null;
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
      new Promise((resolve, reject) => {
        this.socket.emit('message', newMessage, (response) => {
          resolve(this.handleNewData(response.data.newMessage));
        });
      })
      .then(() => {
        let messageInput = document.querySelector('.chat__chat-input');
        messageInput.value = '';
        scrollBottom();
      })
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
