import React, { Component } from 'react';

class MessageArea extends Component {
  render() {
    let messages = this.props.messages.map(({key, message}) => {
      return <li key={key}>{message}</li>
    });

    return (
      <div className="message-area">
        <ul>
          {messages}
        </ul>
      </div>
    );
  }
}

MessageArea.defaultProps = {
  messages: []
};

export default MessageArea;