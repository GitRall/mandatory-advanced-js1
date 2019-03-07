import React from 'react';

class PopupHelper extends React.Component {
  render() {
    return(
      <div className='popup-helper'>

        {this.props.text}
      </div>
    )
  }
}

export default PopupHelper
