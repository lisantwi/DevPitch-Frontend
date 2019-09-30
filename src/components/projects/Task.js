import React from 'react'

class Task extends React.Component{

    render(){
        const {task} = this.props
        return(
            <div>
                {task.name}
            </div>
        )
    }
}

export default Task