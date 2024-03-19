import { useEffect, useRef } from "react";
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default function GanttView({tasks, zoom, onDataUpdated}) {
  let container = useRef();

  useEffect(() => {
   
    let gantt = Gantt.getGanttInstance();
    gantt.init(container.current);
    gantt.parse(tasks);

    function initZoom() {
      gantt.ext.zoom.init({
        levels: [
          {
            name: 'Hours',
            scale_height: 60,
            min_column_width: 30,
            scales: [
              { unit: 'day', step: 1, format: '%d %M' },
              { unit: 'hour', step: 1, format: '%H' }
            ]
          },
          {
            name: 'Days',
            scale_height: 60,
            min_column_width: 70,
            scales: [
              { unit: 'week', step: 1, format: 'Week #%W' },
              { unit: 'day', step: 1, format: '%d %M' }
            ]
          },
          {
            name: 'Months',
            scale_height: 60,
            min_column_width: 70,
            scales: [
              { unit: "month", step: 1, format: '%F' },
              { unit: 'week', step: 1, format: '#%W' }
            ]
          }
        ]
      });
    }
    
    function setZoom(value) {
      if(!gantt.ext.zoom.getLevels()){
        initZoom();
      }
      gantt.ext.zoom.setLevel(value);
    }

    gantt.createDataProcessor((type, action, item, id) => {
      return new Promise((resolve, reject) => {
          onDataUpdated(type, action, item, id)
          // if onDataUpdated changes returns a permanent id of the created item, you can return it from here so dhtmlxGantt could apply it
          //return resolve({id: databaseId});
          return resolve();
        });
      });

    setZoom(zoom);

    return () => {
      gantt.destructor();
      container.current.innerHTML = "";
    };
  }, [zoom]);
  
  return <div ref={container} style={{ width: "100%", height: "100%" }}></div>;
}