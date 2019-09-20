import React from 'react'
import ProjectDescription from './form/ProjectDescription'
import ProjectGraphs from './form/ProjectGraphs'
import ProjectDetails from './form/ProjectDetails'

class NewProjectForm extends React.Component{
    state={
        stage: 1
    }

    continueForm = () => {
        let {stage} = this.state
        this.setState({
            stage: stage+= 1
        })
    }

    renderForm = () => {
        const {continueForm} = this
        switch(this.state.stage){
            case 1:
                return <ProjectDescription continueForm={continueForm} />
                break;
            case 2:
                return <ProjectGraphs continueForm={continueForm}/>
                break
            case 3:
                return <ProjectDetails continueForm={continueForm}/>
                break
        }
    }

    render(){
        const {stage} = this.state
        return(
            <div>
                 {this.renderForm()}
            </div>
           
        )
    }
}

export default NewProjectForm