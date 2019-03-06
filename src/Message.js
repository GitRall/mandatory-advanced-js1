import React from 'react';
import moment from 'moment';

const emojiArray = [
  {str: ':grin:', icon: '😀'},
  {str: ':sweat_smile:', icon: '😃'},
  {str: ':heart_eyes:', icon: '😍'},
  {str: ':heart:', icon: '🧡'},
  {str: ':cry:', icon: '😢'},
  {str: ':joy:', icon: '😂'},
  {str: ':girl:', icon: '👧'},
  {str: ':boy:', icon: '👦'},
  {str: ':beer:', icon: '🍺'},
  {str: ':older_man:', icon: '👴'},
  {str: ':older_woman:', icon: '👵'}
]

class Message extends React.Component {
  constructor(props) {
    super(props)
    this.regExUrl = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;
    this.regExHttp = /^https?:[/\n/]/;
    this.regExEmoji = /:.[^\s:-]*:/g;
  }
  render() {
    const messageArray = this.props.messages.map(message => {
      let messageTimeStamp = moment(message.timestamp).format('DD-MM-YYYY / LT');
      let messageSplit = message.content.split(' ');

      let contentArray = [];
      for(let i = 0; i < messageSplit.length; i++){
        let key = `${message.id}#${i}`;

        if(this.regExEmoji.test(messageSplit[i])){

          let foundEmojis = messageSplit[i].match(this.regExEmoji);
          foundEmojis.forEach((found) => {
            for(let emoji of emojiArray){
              if(emoji.str === found){
                messageSplit[i] = messageSplit[i].replace(found, emoji.icon);
              }
            }
          })
        }

        if(this.regExUrl.test(messageSplit[i])){
          if(!this.regExHttp.test(messageSplit[i])){
            messageSplit[i] = <a className='chat__message-link' key={key} href={'https://' + messageSplit[i]}>{messageSplit[i]} </a>
          }
          else {
            messageSplit[i] = <a className='chat__message-link' key={key} href={messageSplit[i]}>{messageSplit[i]} </a>
          }
        }
        else {
          messageSplit[i] = <span className='chat__message-word' key={key}>{messageSplit[i]} </span>
        }
        contentArray.push(messageSplit[i]);

      }
      return (
        <div className='chat__message-wrapper' key={message.id}>
          <h4 className='chat__user'>{message.username}</h4>
          <span className='chat__timestamp'>{messageTimeStamp}</span>
          <p className='chat__content'>{contentArray}</p>
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
