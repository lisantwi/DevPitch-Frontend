import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from 'moment'

const localizer = momentLocalizer(moment)

class Profile extends React.Component{


    render(){
        const {user} = this.props
        const arr =  user.projects.map(p=> p.tasks)
        const flattened = [].concat.apply([],arr)
        flattened.map(t => {
            return {'name': t.name, 'start_date': t.due_date, 'end_date': t.due_date}
        })
        const events = flattened.map(t => (
            {
            	title: `TASK DUE: ${t.name}`,
                start: t.due_date,
                end: t.due_date,
                allDay: true  
              }))
  
        return(
            <div>
         <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
            /> 
          </div>


        )
    }
}

export default Profile