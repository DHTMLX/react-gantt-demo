import React, { Component } from 'react';
import Gantt from './Gantt';
import './App.css';

var data = {
  data: [
    {id: 1, text: 'Task #1', start_date: '15-04-2017', duration: 3, progress: 0.6},
    {id: 2, text: 'Task #2', start_date: '18-04-2017', duration: 3, progress: 0.4}
  ],
  links: [
    {id: 1, source: 1, target: 2, type: '0'}
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoom: 'Days',
      messages: []
    };

    this.handleZoomChange = this.handleZoomChange.bind(this);
    this.logTaskUpdate = this.logTaskUpdate.bind(this);
    this.logLinkUpdate = this.logLinkUpdate.bind(this);
  }
  
  addMessage(message) {
    var messages = this.state.messages.slice();
    var prevKey = messages.length ? messages[0].key: 0;

    messages.unshift({key: prevKey + 1, message});
    if(messages.length > 40){
      messages.pop();
    }
    this.setState({messages});
  }

  logTaskUpdate(id, mode, task) {
    let text = task && task.text ? ` (${task.text})`: '';
    let message = `Task ${mode}: ${id} ${text}`;
    this.addMessage(message);
  }

  logLinkUpdate(id, mode, link) {
    let message = `Link ${mode}: ${id}`;
    if (link) {
      message += ` ( source: ${link.source}, target: ${link.target} )`;
    }
    this.addMessage(message)
  }

  handleZoomChange(e) {
    this.setState({
      currentZoom: e.target.value
    });
  }  
  
  render() {
    let zoomRadios = ['Hours', 'Days', 'Months'].map((value) => {
      let isActive = this.state.currentZoom === value;
      return (
        <label key={value} className={`radio-label ${isActive ? 'radio-label-active': ''}`}>
          <input type='radio'
            checked={isActive}
            onChange={this.handleZoomChange}
            value={value}/>
          {value}
        </label>
      );
    });

    let messages = this.state.messages.map(({key, message}) => {
      return <li key={key}>{message}</li>
    });

    return (
      <div>
        <div className="zoom-bar">
          <b>Zooming: </b>
          {zoomRadios}
        </div>
        <div className="gantt-container">
          <Gantt
            tasks={data}
            zoom={this.state.currentZoom}
            onTaskUpdated={this.logTaskUpdate}
            onLinkUpdated={this.logLinkUpdate}
          />
        </div>
        <div className="message-area">
          <ul>
            {messages}
          </ul>
        </div>
      </div>
    );
  }
}
export default App;
