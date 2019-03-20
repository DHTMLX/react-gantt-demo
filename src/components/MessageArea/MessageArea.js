import React, { Component } from 'react';

class MessageArea extends Component {
  render() {
    const messages = this.props.messages.map(({ message }) => {
      return <li key={ Math.random() }>{message}</li>
    });

    return (
      <div className="message-area">
        <h3>Messages:</h3>
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
