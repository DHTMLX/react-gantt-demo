import React, { Component } from 'react';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.handleZoomChange = this.handleZoomChange.bind(this);
  }

  handleZoomChange(e) {
    if(this.props.onZoomChange){
      this.props.onZoomChange(e.target.value)
    }
  }

  render() {
    let zoomRadios = ['Hours', 'Days', 'Months'].map((value) => {
      let isActive = this.props.zoom === value;
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

    return (
      <div className="zoom-bar">
        <b>Zooming: </b>
          {zoomRadios}
      </div>
    );
  }
}
