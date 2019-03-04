import React from 'react';
const emojiArray = [
  {str: ':grin:', emoji: '😀'}
]

const emojiList = {
  grin: '😀',
  lol: '😀😀'
}

class Message extends React.Component {
  constructor(props) {
    super(props)
    this.regExpUrl = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    this.regExHttp = /^https?:[/\n/]/;
    this.regExEmoji = /:.[^\s:-]*:/;
  }
  render() {
    const messageArray = this.props.messages.map(message => {

      let messageSplit = message.content.split(' ');
      let newArray = [];
      // messageSplit.forEach((word) => {
      //   if(this.regExpUrl.test(word)){
      //     word = <a href={word}>{word} </a>
      //   }
      //   else {
      //     word = <span>{word} </span>
      //   }
      //   newArray.push(word);
      // })
      // console.log(messageSplit);
      for(let i = 0; i < messageSplit.length; i++){
        let key = `${message.id}#${i}`;
        if(this.regExpUrl.test(messageSplit[i])){
          if(!this.regExHttp.test(messageSplit[i])){
            messageSplit[i] = <a className='chat__message-link' key={key} href={'https://' + messageSplit[i]}>{messageSplit[i]} </a>
          }
          else {
            messageSplit[i] = <a className='chat__message-link' key={key} href={messageSplit[i]}>{messageSplit[i]} </a>
          }
        }
        else if(this.regExEmoji.test(messageSplit[i])){
          // console.log(messageSplit[i]);

        }
        else {
          messageSplit[i] = <span className='chat__message-word' key={key}>{messageSplit[i]} </span>
        }
        newArray.push(messageSplit[i]);
      }
      return (
        <div className='chat__message-wrapper' key={message.id}>
          <h4 className='chat__user'>{message.username}</h4>
          <p className='chat__content'>{newArray}</p>
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
