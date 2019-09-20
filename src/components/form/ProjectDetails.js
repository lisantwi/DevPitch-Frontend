import React from 'react'

class ProjectDetails extends React.Component{
    render(){
        return(
            <div>
                <h2>Phase 3</h2>
                <button onClick={this.props.continueForm}> Continue</button>
            </div>
        )
    }
}

export default ProjectDetails