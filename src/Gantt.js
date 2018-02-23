/*global gantt*/
import React, { Component } from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default class Gantt extends Component {
  setZoom(value){
    switch (value){
      case 'Hours':
        gantt.config.scale_unit = 'day';
        gantt.config.date_scale = '%d %M';

        gantt.config.scale_height = 60;
        gantt.config.min_column_width = 30;
        gantt.config.subscales = [
          {unit:'hour', step:1, date:'%H'}
        ];
        break;
      case 'Days':
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = "week";
        gantt.config.date_scale = "#%W";
        gantt.config.subscales = [
          {unit: "day", step: 1, date: "%d %M"}
        ];
        gantt.config.scale_height = 60;
        break;
      case 'Months':
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = "month";
        gantt.config.date_scale = "%F";
        gantt.config.scale_height = 60;
        gantt.config.subscales = [
          {unit:"week", step:1, date:"#%W"}
        ];
        break;
      default:
        break;
    }
  }

  shouldComponentUpdate(nextProps ){
    return this.props.zoom !== nextProps.zoom;
  }

  componentDidUpdate() {
    gantt.render();
  }

  initGanttEvents() {
    if(gantt.ganttEventsInitialized){
      return;
    }
    gantt.ganttEventsInitialized = true;

    gantt.attachEvent('onAfterTaskAdd', (id, task) => {
      if(this.props.onTaskUpdated) {
        this.props.onTaskUpdated(id, 'inserted', task);
      }
    });

    gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
      if(this.props.onTaskUpdated) {
        this.props.onTaskUpdated(id, 'updated', task);
      }
    });

    gantt.attachEvent('onAfterTaskDelete', (id) => {
      if(this.props.onTaskUpdated) {
        this.props.onTaskUpdated(id, 'deleted');
      }
    });

    gantt.attachEvent('onAfterLinkAdd', (id, link) => {
      if(this.props.onLinkUpdated) {
        this.props.onLinkUpdated(id, 'inserted', link);
      }
    });

    gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
      if(this.props.onLinkUpdated) {
        this.props.onLinkUpdated(id, 'updated', link);
      }
    });

    gantt.attachEvent('onAfterLinkDelete', (id, link) => {
      if(this.props.onLinkUpdated) {
        this.props.onLinkUpdated(id, 'deleted');
      }
    });
  }
  
  componentDidMount() {
    this.initGanttEvents();
    gantt.init(this.ganttContainer);
    gantt.parse(this.props.tasks);
  }

  render() {
    this.setZoom(this.props.zoom);

    return (
        <div
            ref={(input) => { this.ganttContainer = input }}
            style={{width: '100%', height: '100%'}}
        ></div>
    );
  }
}