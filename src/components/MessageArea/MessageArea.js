function MessageArea({messages}) {
  let formattedmessages = messages.map((message) => {
    return <li key={ Math.random() }>{message}</li>
  });

  return <div className="message-area">
        <h3>Messages:</h3>
        <ul>
          {formattedmessages}
        </ul>
      </div>
}

export default MessageArea;
