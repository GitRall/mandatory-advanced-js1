import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props)
    this.regExpUrl = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  }
  render() {
    const messageArray = this.props.messages.map(message => {

      // console.log(regExpUrl);
      let messageSplit = message.content.split(' ');
      // console.log(messageSplit);
      // for(let word of messageSplit){
      //   if(regExpUrl.test(word)){
      //     // console.log(word);
      //     word = <a href={word}>{word}</a>
      //     console.log(messageSplit);
      //   }
      // }

      messageSplit.forEach((word) => {
        if(this.regExpUrl.test(word)){
          word = <a href={word}>{word}</a>
          console.log(word);
        }
      })
      console.log(messageSplit);
      message.content = messageSplit.join(' ');


      return (
        <div className='chat__message-wrapper' key={message.id}>
          <h4 className='chat__user'>{message.username}</h4>
          <p className='chat__content'>{message.content}</p>
        </div>
      )
    })
    return(
      <div>
        { messageArray }
      </div>
    )

  }
}

export default Message
